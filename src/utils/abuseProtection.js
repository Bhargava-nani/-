import { checkRateLimit, getRateLimitStatus, clearAllRateLimits } from './rateLimiter.js';
import { logger } from './logger.js';

const DEFAULT_PROTECTION_POLICY = Object.freeze({
  maxAttempts: 2,
  windowMs: 30_000,
});

const DEFAULT_ANOMALY_POLICY = Object.freeze({
  threshold: 3,
  windowMs: 5 * 60_000,
});

const MAX_STORED_BLOCKED_ENTRIES = 5_000;

const RISKY_COMMAND_CATEGORIES = new Set([
  'moderation',
  'ticket',
  'config',
  'verification',
]);

const RISKY_COMMAND_NAMES = new Set([
  'wipedata',
  'massban',
  'masskick',
  'ban',
  'kick',
  'timeout',
  'untimeout',
  'purge',
  'warn',
  'unban',
  'lock',
  'unlock',
  'ticket',
  'reactroles',
]);

const blockedAttemptStore = new Map();

function normalizeCommandCategory(command) {
  return String(command?.category ?? '').trim().toLowerCase();
}

function normalizeCommandName(commandName) {
  return String(commandName ?? '').trim().toLowerCase();
}

function getCommandPolicy(command) {
  const protection = command?.abuseProtection ?? {};
  const maxAttempts = Number.isInteger(protection.maxAttempts) && protection.maxAttempts > 0
    ? protection.maxAttempts
    : DEFAULT_PROTECTION_POLICY.maxAttempts;

  const windowMs = Number.isInteger(protection.windowMs) && protection.windowMs > 0
    ? protection.windowMs
    : DEFAULT_PROTECTION_POLICY.windowMs;

  return { maxAttempts, windowMs };
}

function getAnomalyPolicy(command) {
  const anomaly = command?.abuseProtection?.anomaly ?? {};
  const threshold = Number.isInteger(anomaly.threshold) && anomaly.threshold > 0
    ? anomaly.threshold
    : DEFAULT_ANOMALY_POLICY.threshold;

  const windowMs = Number.isInteger(anomaly.windowMs) && anomaly.windowMs > 0
    ? anomaly.windowMs
    : DEFAULT_ANOMALY_POLICY.windowMs;

  return { threshold, windowMs };
}

function getProtectionKey(interaction, commandName) {
  const guildScope = interaction.guildId || 'dm';
  const userId = interaction.user?.id || 'unknown_user';
  const normalizedName = normalizeCommandName(commandName);
  return `${guildScope}:${userId}:${normalizedName}`;
}

function pruneBlockedAttempts() {
  if (blockedAttemptStore.size <= MAX_STORED_BLOCKED_ENTRIES) return;

  const entries = [...blockedAttemptStore.entries()];
  entries.sort((a, b) => a[1].windowStart - b[1].windowStart);

  const excess = blockedAttemptStore.size - MAX_STORED_BLOCKED_ENTRIES;
  for (let i = 0; i < excess; i += 1) {
    blockedAttemptStore.delete(entries[i][0]);
  }
}

function recordBlockedAttempt(key, interaction, commandName, command, remainingMs) {
  const now = Date.now();
  const anomalyPolicy = getAnomalyPolicy(command);
  const current = blockedAttemptStore.get(key);

  if (!current || now - current.windowStart > anomalyPolicy.windowMs) {
    blockedAttemptStore.set(key, {
      count: 1,
      windowStart: now,
      thresholdReachedAt: null,
      lastBlockedAt: now,
    });
    pruneBlockedAttempts();
    return {
      count: 1,
      thresholdReached: false,
    };
  }

  current.count += 1;
  current.lastBlockedAt = now;

  const thresholdReached = current.count >= anomalyPolicy.threshold && !current.thresholdReachedAt;

  if (thresholdReached) {
    current.thresholdReachedAt = now;

    logger.warn('🛡️ Abuse anomaly detected for risky command cooldown breaches', {
      event: 'interaction.command.abuse_anomaly',
      guildId: interaction.guildId,
      userId: interaction.user?.id,
      command: normalizeCommandName(commandName),
      anomalyCount: current.count,
      anomalyThreshold: anomalyPolicy.threshold,
      anomalyWindowMs: anomalyPolicy.windowMs,
      cooldownRemainingMs: remainingMs,
    });
  }

  return {
    count: current.count,
    thresholdReached,
  };
}

export function formatCooldownDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) {
    return 'a moment';
  }

  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0 && seconds > 0) return `${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export function isRiskyCommand(command, commandName) {
  const protectionEnabled = command?.abuseProtection?.enabled;

  if (protectionEnabled === false) {
    return false;
  }

  if (protectionEnabled === true) {
    return true;
  }

  const normalizedName = normalizeCommandName(commandName);
  if (RISKY_COMMAND_NAMES.has(normalizedName)) {
    return true;
  }

  const normalizedCategory = normalizeCommandCategory(command);
  return RISKY_COMMAND_CATEGORIES.has(normalizedCategory);
}

export async function enforceAbuseProtection(interaction, command, commandName) {
  const normalizedName = normalizeCommandName(commandName);

  if (!isRiskyCommand(command, normalizedName)) {
    return {
      allowed: true,
      risky: false,
      remainingMs: 0,
      policy: null,
      reason: null,
      command: normalizedName,
    };
  }

  const policy = getCommandPolicy(command);
  const key = getProtectionKey(interaction, normalizedName);
  const allowed = await checkRateLimit(key, policy.maxAttempts, policy.windowMs);

  if (allowed) {
    return {
      allowed: true,
      risky: true,
      remainingMs: 0,
      policy,
      reason: null,
      command: normalizedName,
    };
  }

  const status = getRateLimitStatus(key, policy.windowMs);
  const remainingMs = Math.max(0, status?.remaining || 0);
  const attemptCount = Number.isInteger(status?.attempts) ? status.attempts : 0;

  logger.info('⛔ Risky command blocked by cooldown policy', {
    event: 'interaction.command.abuse_blocked',
    guildId: interaction.guildId,
    userId: interaction.user?.id,
    command: normalizedName,
    maxAttempts: policy.maxAttempts,
    windowMs: policy.windowMs,
    remainingMs,
    attemptCount,
  });

  const anomaly = recordBlockedAttempt(key, interaction, normalizedName, command, remainingMs);

  return {
    allowed: false,
    risky: true,
    remainingMs,
    policy,
    reason: 'cooldown_blocked',
    command: normalizedName,
    blockedAttempts: anomaly.count,
    anomalyTriggered: anomaly.thresholdReached,
  };
}

export function getAbuseProtectionSnapshot() {
  return {
    blockedEntries: blockedAttemptStore.size,
  };
}

export function cleanupAbuseProtectionState(maxAgeMs = DEFAULT_ANOMALY_POLICY.windowMs) {
  const now = Date.now();

  for (const [key, value] of blockedAttemptStore.entries()) {
    if (!value || now - value.windowStart > maxAgeMs) {
      blockedAttemptStore.delete(key);
    }
  }
}

export function resetAbuseProtectionState() {
  blockedAttemptStore.clear();
  clearAllRateLimits();
}

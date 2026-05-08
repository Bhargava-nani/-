import { Events, AuditLogEvent, EmbedBuilder } from 'discord.js';
import { logEvent } from '../services/loggingService.js';
import { logger } from '../utils/logger.js';

const MOD_ACTIONS = new Set([
  AuditLogEvent.MemberBanAdd,
  AuditLogEvent.MemberBanRemove,
  AuditLogEvent.MemberKick,
  AuditLogEvent.MemberRoleUpdate,
  AuditLogEvent.MemberUpdate,
  AuditLogEvent.MemberMove,
  AuditLogEvent.MessageDelete,
  AuditLogEvent.MessageBulkDelete,
  AuditLogEvent.ChannelCreate,
  AuditLogEvent.ChannelDelete,
  AuditLogEvent.ChannelUpdate,
]);

export default {
  name: Events.GuildAuditLogEntryCreate,
  once: false,

  async execute(entry, guild) {
    try {
      if (!guild || !entry) return;
      if (!entry.executorId || entry.executorId === guild.client.user.id) return;
      if (!MOD_ACTIONS.has(entry.action)) return;

      const embed = new EmbedBuilder()
        .setColor('#ff4444')
        .setTitle('🛡️ External Moderation Action Detected')
        .setDescription('Another bot or moderator performed an important action.')
        .addFields(
          {
            name: '⚙️ Action',
            value: `\`${String(entry.action)}\``,
            inline: true,
          },
          {
            name: '👤 Executor',
            value: entry.executor
              ? `${entry.executor.tag} (\`${entry.executor.id}\`)`
              : `Unknown (\`${entry.executorId}\`)`,
            inline: true,
          },
          {
            name: '🎯 Target',
            value: entry.targetId
              ? `\`${entry.targetId}\``
              : 'Unknown',
            inline: true,
          },
        )
        .setTimestamp()
        .setFooter({
          text: `${guild.name} Security Logs`,
        });

      await logEvent({
        client: guild.client,
        guildId: guild.id,
        eventType: 'moderation.auditlog',
        data: {
          embeds: [embed],
        },
      });

    } catch (error) {
      logger.error('❌ Error in guildAuditLogEntryCreate event:', error);
    }
  },
};

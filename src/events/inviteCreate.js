import { Events } from 'discord.js';
import { upsertInvite } from '../utils/inviteTracker.js';

export default {
  name: Events.InviteCreate,
  once: false,

  async execute(invite) {
    try {
      upsertInvite(invite);
    } catch {
      // ignore
    }
  },
};

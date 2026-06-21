// src/modules/invitations/invitation.service.ts

import crypto from 'crypto';
import { invitationRepository } from './invitation.repository';

export const invitationService = {
    async create(payload: { email: string; role_id: string }) {
        const token = crypto.randomBytes(32).toString('hex');

        const redirect_link = `${process.env.FRONTEND_URL}/register?invite=${token}`;

        const invitation = await invitationRepository.create({
            email: payload.email,
            role_id: payload.role_id,
            token,
            redirect_link,
            status: 'PENDING',
            expired_at: new Date(Date.now() + 7 * 86400000),
        });

        return invitation;
    },
};

// auth.service.ts

import { userRepository } from '../users/user.repository';
import { invitationRepository } from '../invitations/invitation.repository';
import { RegisterWithInvitationRequest } from './auth.types';

export const authService = {
    async registerWithInvitation(payload: RegisterWithInvitationRequest) {
        const invitation = await invitationRepository.findByToken(payload.token);

        if (!invitation) {
            throw new Error('Invitation not found');
        }

        if (invitation.status !== 'PENDING') {
            throw new Error('Invitation already used');
        }

        if (invitation.email.toLowerCase() !== payload.email.toLowerCase()) {
            throw new Error('Email mismatch');
        }

        const existingUser = await userRepository.findByEmail(payload.email);

        if (existingUser) {
            return existingUser;
        }

        const userId = await userRepository.create({
            email: payload.email,
            display_name: payload.display_name,
            photo_url: payload.photo_url,

            invitation_id: invitation.invitation_id,

            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });

        await invitationRepository.markAsUsed(invitation.invitation_id, userId);

        return {
            user_id: userId,
        };
    },
};

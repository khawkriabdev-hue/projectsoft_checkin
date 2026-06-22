// invitation.service.ts

import { v4 as uuidv4 } from 'uuid';
import {
    CreateInvitationRequest,
    CreateInvitationResponse,
    GetInvitationListRequest,
    GetInvitationListResponse,
    Invitation,
} from './invitation.types';
import { invitationRepository } from './invitation.repository';

export const invitationService = {
    async createInvitation(payload: CreateInvitationRequest, adminUserId: string): Promise<CreateInvitationResponse> {
        const token = uuidv4();

        const invitation: Omit<Invitation, 'invitation_id'> = {
            email: payload.email,
            token,
            redirect_url: payload.redirect_url,
            status: 'PENDING',

            created_by: adminUserId,
            created_at: new Date().toISOString(),

            expired_at: payload.expired_at,
        };

        const invitation_id = await invitationRepository.create(invitation);

        const invitationData: Invitation = {
            invitation_id,
            ...invitation,
        };

        return {
            invitation: invitationData,
            invitation_link: `${payload.redirect_url}?token=${token}`,
        };
    },

    async getInvitationList(payload?: GetInvitationListRequest): Promise<GetInvitationListResponse> {
        let invitations = await invitationRepository.getList();

        if (payload?.status) {
            invitations = invitations.filter((item) => item.status === payload.status);
        }

        return {
            invitations,
        };
    },
};

// src/modules/invitations/invitation.types.ts

export interface CreateInvitationRequest {
    email: string;
    role_id: string;
}

export interface InvitationResponse {
    invitation_id: string;
    email: string;
    role_id: string;
    status: string;
    redirect_link: string;
    expired_at: Date;
}

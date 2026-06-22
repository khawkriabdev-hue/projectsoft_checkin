// invitation.types.ts

export type InvitationStatus = 'PENDING' | 'USED' | 'EXPIRED';

export interface Invitation {
    invitation_id: string;
    email: string;
    token: string;
    redirect_url: string;
    status: InvitationStatus;

    created_by: string;
    created_at: string;

    expired_at: string;
    used_at?: string;

    user_id?: string;
}

export interface CreateInvitationRequest {
    email: string;
    redirect_url: string;
    expired_at: string;
}

export interface CreateInvitationResponse {
    invitation: Invitation;
    invitation_link: string;
}

// invitation.types.ts

export interface GetInvitationListRequest {
    status?: InvitationStatus;
}

export interface GetInvitationListResponse {
    invitations: Invitation[];
}

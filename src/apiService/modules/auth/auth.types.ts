// auth.types.ts

export interface RegisterWithInvitationRequest {
    token: string;
    email: string;
    display_name: string;
    photo_url?: string;
}

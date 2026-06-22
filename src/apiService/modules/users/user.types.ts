// user.types.ts

export interface User {
    user_id: string;

    email: string;
    display_name: string;
    photo_url?: string;

    created_at: string;
    updated_at: string;

    invitation_id: string;
}

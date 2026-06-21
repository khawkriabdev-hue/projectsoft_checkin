// src/modules/invitations/invitation.schema.ts

import { z } from 'zod';

export const createInvitationSchema = z.object({
    email: z.string().email(),
    role_id: z.string().min(1),
});

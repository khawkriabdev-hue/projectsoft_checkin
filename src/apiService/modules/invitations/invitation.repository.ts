// // src/modules/invitations/invitation.repository.ts

// import { db } from 'context/FirebaseProvider/FirebaseProvider';

// // import { db } from '../../config/firebase';

// export const invitationRepository = {
//     async create(data: any) {
//         const ref = db.collection('invitation-links').doc();

//         await ref.set({
//             invitation_id: ref.id,
//             ...data,
//             created_at: new Date(),
//         });

//         return {
//             invitation_id: ref.id,
//             ...data,
//         };
//     },
// };

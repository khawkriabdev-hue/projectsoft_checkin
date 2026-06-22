// invitation.repository.ts

import { addDoc, collection, doc, getDoc, query, where, getDocs, updateDoc, orderBy } from 'firebase/firestore';

import { Invitation } from './invitation.types';
import { db } from 'apiService/firebase';

const COLLECTION = 'invitations';

export const invitationRepository = {
    async create(data: Omit<Invitation, 'invitation_id'>) {
        const ref = await addDoc(collection(db, COLLECTION), data);

        await updateDoc(ref, {
            invitation_id: ref.id,
        });

        return ref.id;
    },

    async findByToken(token: string) {
        const q = query(collection(db, COLLECTION), where('token', '==', token));

        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        return {
            invitation_id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
        } as Invitation;
    },

    async findById(invitation_id: string) {
        const snapshot = await getDoc(doc(db, COLLECTION, invitation_id));

        if (!snapshot.exists()) return null;

        return {
            invitation_id: snapshot.id,
            ...snapshot.data(),
        } as Invitation;
    },

    async markAsUsed(invitationId: string, userId: string) {
        await updateDoc(doc(db, 'invitations', invitationId), {
            status: 'USED',
            used_at: new Date().toISOString(),
            user_id: userId,
        });
    },

    async getList() {
        const q = query(collection(db, COLLECTION), orderBy('created_at', 'desc'));

        const snapshot = await getDocs(q);

        return snapshot.docs.map(
            (doc) =>
                ({
                    invitation_id: doc.id,
                    ...doc.data(),
                }) as Invitation
        );
    },
};

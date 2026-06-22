// user.repository.ts

import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { User } from './user.types';
import { db } from 'apiService/firebase';

const COLLECTION = 'users';

export const userRepository = {
    async create(user: Omit<User, 'user_id'>) {
        const ref = await addDoc(collection(db, COLLECTION), user);

        await updateDoc(ref, {
            user_id: ref.id,
        });

        return ref.id;
    },

    async findByEmail(email: string) {
        const q = query(collection(db, COLLECTION), where('email', '==', email));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        return {
            user_id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
        } as User;
    },
};

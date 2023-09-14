import { db } from './firebase';
import { collection } from 'firebase/firestore';

export const Users = collection(db, 'users');
export const Messages = collection(db, 'messages');

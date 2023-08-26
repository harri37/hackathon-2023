import { db } from "../firebase";
import {
    onSnapshot,
    collection,
    orderBy,
    query,
    doc,
    setDoc,
} from "firebase/firestore";

export const streamUsers = (snapshot, error) => {
    const users = collection(db, "users");
    const userQuery = query(users, orderBy("rating", "desc"));
    return onSnapshot(userQuery, snapshot, error);
};

export const addUser = async (uid, user) => {
    const users = collection(db, "users");
    await setDoc(doc(users, uid), user);
};

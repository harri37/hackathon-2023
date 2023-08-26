import { db } from "../firebase";
import {
    onSnapshot,
    collection,
    where,
    orderBy,
    getDocs,
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

export const streamUser = (uid, snapshot, error) => {
    const user = doc(db, "users", uid);
    return onSnapshot(user, snapshot, error);
};

export const userExists = async (username) => {
    const users = collection(db, "users");
    const userQuery = query(users, where("username", "==", username));
    const userSnapshot = await getDocs(userQuery);
    return !userSnapshot.empty;
};

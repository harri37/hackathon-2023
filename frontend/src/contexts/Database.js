import { db } from "../firebase";
import {
    onSnapshot,
    collection,
    orderBy,
    query,
    doc,
    setDoc,
    updateDoc,
    getDoc,
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

export const getRating = async (uid) => {
    const user = doc(db, "users", uid);
    const docSnap = await getDoc(user);
    if (docSnap.exists()) {
        return docSnap.data().rating;
    }
};

export const addRating = async (uid, toAdd) => {
    const user = doc(db, "users", uid);
    let rating = await getRating(uid);
    // get the current rating
    rating += toAdd;
    // update the rating
    await updateDoc(user, { rating: rating, merge: true });
};

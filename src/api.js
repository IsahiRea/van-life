import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where, setDoc } from "firebase/firestore/lite";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAalVUUmQ5jPFGKBBB8Bn6HfJFVnGqwzc4",
  authDomain: "vanlife-49815.firebaseapp.com",
  projectId: "vanlife-49815",
  storageBucket: "vanlife-49815.firebasestorage.app",
  messagingSenderId: "23593798740",
  appId: "1:23593798740:web:46ef9d2292d3fb7937b1c1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

const vansCollectionRef = collection(db, 'vans');


export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id);
    const snapshot = await getDoc(docRef);
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("You must be logged in to view your vans");
    }

    const q = query(vansCollectionRef, where("hostId", "==", user.uid));
    const snapshot = await getDocs(q);
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    return vans;
}

// Sign up function
export async function signUpUser({ email, password, name }) {
    try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // Create user profile document in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            name: name,
            createdAt: new Date().toISOString(),
            role: "host"
        });

        return { user: userCredential.user };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Sign in function
export async function signInUser({ email, password }) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { user: userCredential.user };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Sign out function
export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
}
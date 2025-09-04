import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"
import { db, auth } from "../firebase/index"
import type { Note } from "../types"

// Check if user is authenticated
function checkAuth() {
    if (!auth.currentUser) {
        throw new Error('User must be authenticated to access notes')
    }
    return auth.currentUser
}

async function userExists(userId: string) {
    const userRef = collection(db, "users")
    const q = query(userRef, where("uid", "==", userId))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
}

async function addUser(userId: string, userEmail: string) {
    const userRef = collection(db, "users")
    await setDoc(doc(db, "users", userId), { 
        uid: userId, 
        email: userEmail 
    })
}

export async function getAllNotes(userEmail: string) {
    // Ensure user is authenticated
    const user = checkAuth()
    
    if (!await userExists(user.uid)) 
        await addUser(user.uid, userEmail)
    
    // Query the notes collection for this user's notes
    const notesRef = collection(db, "notes")
    const q = query(notesRef, where("userId", "==", user.uid))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Note))
}

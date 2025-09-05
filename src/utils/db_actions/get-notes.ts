import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"
import { db, auth } from "../../firebase/index"
import { APP_CONFIG } from "../../constants"
import { MESSAGES } from "../../constants/messages"
import { AuthenticationError, DatabaseError, handleError } from "../errors"
import type { Note } from "../../types"

// Check if user is authenticated
function checkAuth() {
    if (!auth.currentUser) {
        throw new AuthenticationError()
    }
    return auth.currentUser
}

async function userExists(userId: string): Promise<boolean> {
    try {
        const userRef = collection(db, APP_CONFIG.COLLECTIONS.USERS)
        const q = query(userRef, where("uid", "==", userId))
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
    } catch (error) {
        throw new DatabaseError('Failed to check if user exists', error)
    }
}

async function addUser(userId: string, userEmail: string): Promise<void> {
    try {
        await setDoc(doc(db, APP_CONFIG.COLLECTIONS.USERS, userId), { 
            uid: userId, 
            email: userEmail 
        })
    } catch (error) {
        throw new DatabaseError('Failed to add user', error)
    }
}

export async function getAllNotes(userEmail: string): Promise<Note[]> {
    try {
        // Ensure user is authenticated
        const user = checkAuth()
        
        // Ensure user exists in database
        if (!await userExists(user.uid)) {
            await addUser(user.uid, userEmail)
        }
        
        // Query the notes collection for this user's notes
        const notesRef = collection(db, APP_CONFIG.COLLECTIONS.NOTES)
        const q = query(notesRef, where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        } as Note))
    } catch (error) {
        const appError = handleError(error)
        console.error('Failed to get notes:', appError)
        throw appError
    }
}

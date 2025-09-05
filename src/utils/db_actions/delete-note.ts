import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/index"
import { APP_CONFIG } from "../../constants"
import { DatabaseError, handleError } from "../errors"

export async function deleteNote(noteId: string): Promise<void> {
    try {
        if (!noteId.trim()) {
            throw new Error('Note ID is required')
        }
        
        await deleteDoc(doc(db, APP_CONFIG.COLLECTIONS.NOTES, noteId))
    } catch (error) {
        const appError = handleError(error)
        console.error('Failed to delete note:', appError)
        throw appError
    }
}
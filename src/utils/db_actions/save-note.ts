import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { getCurrentTabUrl } from "../get-current-tab-url"
import { db, auth } from "../../firebase/index"
import { APP_CONFIG } from "../../constants"
import { MESSAGES } from "../../constants/messages"
import { AuthenticationError, ValidationError, DatabaseError, handleError } from "../errors"
import type { SaveNoteResponse } from "../../types"

export async function saveNote(
  title: string, 
  note: string, 
  existingNoteId?: string | null
): Promise<SaveNoteResponse> {
  try {
    // Authentication check
    if (!auth.currentUser) {
      throw new AuthenticationError('User must be authenticated to save notes')
    }

    // Validation
    if (!title.trim() && !note.trim()) {
      throw new ValidationError(MESSAGES.ERRORS.EMPTY_NOTE)
    }

    const userId = auth.currentUser.uid
    
    // Use existing note ID or create a new one
    const noteId = existingNoteId || `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const currentUrl = await getCurrentTabUrl()
    
    const noteData: any = {
      title: title.trim(),
      note: note.trim(),
      url: currentUrl || '',
      userId,
      updatedAt: serverTimestamp()
    }

    // If it's a new note, include createdAt
    if (!existingNoteId) {
      noteData.createdAt = serverTimestamp()
    }

    await setDoc(doc(db, APP_CONFIG.COLLECTIONS.NOTES, noteId), noteData, { merge: true })
    
    // Fetch the document to get the actual server timestamp
    const savedDoc = await getDoc(doc(db, APP_CONFIG.COLLECTIONS.NOTES, noteId))
    const savedData = savedDoc.data()
    
    // Return both the note ID and the actual server timestamp
    return { 
      noteId, 
      savedAt: savedData?.updatedAt?.toDate() || new Date()
    }
  } catch (error) {
    const appError = handleError(error)
    console.error('Failed to save note:', appError)
    throw appError
  }
}

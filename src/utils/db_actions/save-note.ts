import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { db, auth } from "../../firebase/index"

export async function saveNote(title: string, note: string, existingNoteId?: string | null): Promise<{ noteId: string, savedAt: Date }> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to save notes')
  }

  if (!title.trim() && !note.trim()) {
    throw new Error('Cannot save empty notes')
  }

  const userId = auth.currentUser.uid
  
  // Use existing note ID or create a new one
  const noteId = existingNoteId || `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const noteData: any = {
    title: title.trim(),
    note: note.trim(),
    url: window.location.href,
    userId,
    updatedAt: serverTimestamp()
  }

  // If it's a new note, include createdAt
  if (!existingNoteId) {
    noteData.createdAt = serverTimestamp()
  }

  await setDoc(doc(db, "notes", noteId), noteData, { merge: true })
  
  // Fetch the document to get the actual server timestamp
  const savedDoc = await getDoc(doc(db, "notes", noteId))
  const savedData = savedDoc.data()
  
  // Return both the note ID and the actual server timestamp
  return { 
    noteId, 
    savedAt: savedData?.updatedAt?.toDate() || new Date()
  }
}

import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/index"

export async function deleteNote(noteId: string) {
    await deleteDoc(doc(db, "notes", noteId))
}
import React from "react"

import type { Note } from "../../types"
import { NoteEditor } from "./index"

interface ExistingNoteProps {
  note: Note
  onBack: () => void
}

const ExistingNote = ({ note, onBack }: ExistingNoteProps) => {
  return <NoteEditor initialNote={note} onBack={onBack} />
}

export default ExistingNote

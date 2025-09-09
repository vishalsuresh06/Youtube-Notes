import React from 'react'
import { NoteEditor } from './index'
import type { Note } from '../../types'

interface ExistingNoteProps {
  note: Note
  onBack: () => void
}

const ExistingNote = ({ note, onBack }: ExistingNoteProps) => {
  return <NoteEditor initialNote={note} onBack={onBack} />
}

export default ExistingNote

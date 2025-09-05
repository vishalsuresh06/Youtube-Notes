import React from 'react'
import NoteEditor from './NoteEditor'

interface NewNoteProps {
    onBack: () => void
}

const NewNote = ({ onBack }: NewNoteProps) => {
  return <NoteEditor onBack={onBack} />
}

export default NewNote
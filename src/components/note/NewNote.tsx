import React from 'react'
import NoteEditor from './NoteEditor'
import type { NewNoteProps } from '../../types'

const NewNote = ({ onBack }: NewNoteProps) => {
  // Dashboard already validated YouTube URL before navigating here
  // So we can directly show the NoteEditor
  return <NoteEditor onBack={onBack} />
}

export default NewNote
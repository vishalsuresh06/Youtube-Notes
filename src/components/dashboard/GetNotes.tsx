import React, { useState, useEffect } from 'react'
import type { Note } from '../../types'
import { getAllNotes } from '../../utils'

interface GetNotesProps {
  email: string | null
  onAddNote: () => void
  onEditNote: (note: Note) => void
}

function NotesDisplay({ notes, onEditNote }: { notes: Note[], onEditNote: (note: Note) => void }) {
  if (notes.length === 0) 
    return <div>No notes found</div>
  return (
    <div>
      {notes.map((note) => (
        <div 
          key={note.id} 
          onClick={() => onEditNote(note)}
          style={{ cursor: 'pointer' }}
        >
          <h4>{note.title || 'Untitled'}</h4>
        </div>
      ))}
    </div>
  )
}

const GetNotes = ({ email, onAddNote, onEditNote }: GetNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (email) {
      setLoading(true)
      getAllNotes(email)
        .then(setNotes)
        .catch((error) => {
          console.error('Failed to fetch notes:', error)
        })
        .finally(() => setLoading(false))
    }
  }, [email])
  
  return (
    <div>
      <div>
        <h1>Your Notes</h1>
        <button onClick={onAddNote}>Add Note</button>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Search notes..." 
        />
      </div>
      {loading ? (
        <div>
          <p>Loading notes...</p>
        </div>
      ) : (
        <NotesDisplay notes={notes} onEditNote={onEditNote} />
      )}
    </div>
  )
}

export default GetNotes

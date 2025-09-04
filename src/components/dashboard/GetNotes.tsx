import React, { useState, useEffect } from 'react'
import styles from './dashboard.module.css'
import type { Note } from '../../types'
import { getAllNotes } from '../../utils'

interface GetNotesProps {
  email: string | null
}

function NotesDisplay({ notes }: { notes: Note[] }) {
  if (notes.length === 0) 
    return <div>No notes found</div>
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  )
}

const GetNotes = ({ email }: GetNotesProps) => {
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
      <h1> Your Notes</h1>
      <input type="text" placeholder="Search notes" />
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading notes...</p>
        </div>
      ) : (
        <NotesDisplay notes={notes} />
      )}
    </div>
  )
}

export default GetNotes

import React, { useState, useEffect } from 'react'
import type { Note } from '../../types'
import { getAllNotes } from '../../utils'
import styles from './dashboard.module.css'
import deleteIcon from '../../../assets/delete.svg'

interface GetNotesProps {
  email: string | null
  onAddNote: () => void
  onEditNote: (note: Note) => void
}

function NotesDisplay({ notes, onEditNote }: { notes: Note[], onEditNote: (note: Note) => void }) {
  if (notes.length === 0) 
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>No notes found</h3>
        <p className={styles.emptyStateText}>Start by creating your first note!</p>
      </div>
    )
  return (
    <div className={styles.notesList}>
      {notes.map((note) => (
        <div 
          key={note.id} 
          className={styles.noteCard}
        >
          <div onClick={() => onEditNote(note)} style={{ cursor: 'pointer', flex: 1 }}>
            <h4 className={styles.noteTitle}>{note.title || 'Untitled'}</h4>
          </div>
          <div className={styles.noteActions}>
            <button className={styles.deleteNoteButton}><img src={deleteIcon} alt="Delete" /></button>
          </div>
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
    <div className={styles.notesSection}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Your Notes</h2>
        <button onClick={onAddNote} className={styles.addNoteButton}>
          <span>+</span> Add Note
        </button>
      </div>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search notes..." 
          className={styles.searchInput}
        />
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>Loading notes...</p>
        </div>
      ) : (
        <NotesDisplay notes={notes} onEditNote={onEditNote} />
      )}
    </div>
  )
}

export default GetNotes

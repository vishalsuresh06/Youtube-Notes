import React, { useState, useEffect } from 'react'
import type { Note } from '../../types'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import styles from './dashboard.module.css'
import deleteIcon from '../../../assets/delete.svg'

interface GetNotesProps {
  email: string | null
  onAddNote: () => void
  onEditNote: (note: Note) => void
}
function NotesDisplay({ notes, usedSearch, onEditNote, onDeleteNote }: { 
  notes: Note[], 
  usedSearch: boolean,
  onEditNote: (note: Note) => void,
  onDeleteNote: (noteId: string) => Promise<void>
}) {
  const handleDeleteNote = async (note: Note) => {
    await onDeleteNote(note.id)
  }

  if (notes.length === 0) 
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>No notes found</h3>
        <p className={styles.emptyStateText}>
          {usedSearch ? 'Try a different search!' : 'Start by creating your first note!'}
        </p>
      </div>
    )
  return (
    <div className={styles.notesList}>
      {notes.map((note, index) => (
        <div 
          key={note.id} 
          className={styles.noteCard}
        >
          <div onClick={() => onEditNote(note)} className={styles.noteCardContent}>
            <h4 className={styles.noteTitle}>{note.title || 'Untitled'}</h4>
          </div>
          <div className={styles.noteActions}>
            <button className={styles.deleteNoteButton} onClick={() => handleDeleteNote(note)}><img src={deleteIcon} alt="Delete" /></button>
          </div>
        </div>
      ))}
    </div>
  )
}

const GetNotes = ({ email, onAddNote, onEditNote }: GetNotesProps) => {
  const { data: notes, deleteData, isReady } = useFirestoreCollection<Note>("notes")
  const [userSearch, setUserSearch] = useState('')
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

  useEffect(() => {
    if (userSearch.trim() !== '') {
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().trim().includes(userSearch.toLowerCase().trim())))
    } else {
      setFilteredNotes(notes)
    }
  }, [userSearch, notes])

  const handleDeleteNote = async (noteId: string) => {
    if (deleteData) {
      await deleteData(noteId)
    }
  }
  
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
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </div>
      {!isReady ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>Loading notes...</p>
        </div>
      ) : (
        <NotesDisplay notes={filteredNotes} usedSearch={userSearch.trim() !== ''} onEditNote={onEditNote} onDeleteNote={handleDeleteNote} />
      )}
    </div>
  )
}

export default GetNotes

import React from 'react'
import { useNotes } from '../../hooks/useNotes'
import { Button, LoadingSpinner, EmptyState } from '../ui'
import { MESSAGES } from '../../constants/messages'
import type { GetNotesProps, NotesDisplayProps, Note } from '../../types'
import styles from './dashboard.module.css'
import deleteIcon from '../../../assets/delete.svg'

const NotesDisplay = ({ 
  notes, 
  usedSearch, 
  onEditNote, 
  onDeleteNote 
}: NotesDisplayProps) => {
  const handleDeleteNote = (note: Note) => {
    onDeleteNote(note.id)
  }

  if (notes.length === 0) {
    return (
      <EmptyState
        title={MESSAGES.EMPTY_STATES.NO_NOTES_TITLE}
        message={usedSearch ? MESSAGES.EMPTY_STATES.NO_SEARCH_RESULTS : MESSAGES.EMPTY_STATES.NO_NOTES_MESSAGE}
      />
    )
  }

  return (
    <div className={styles.notesList}>
      {notes.map((note) => (
        <div key={note.id} className={styles.noteCard}>
          <div 
            onClick={() => onEditNote(note)} 
            style={{ cursor: 'pointer', flex: 1 }}
          >
            <h4 className={styles.noteTitle}>
              {note.title || MESSAGES.PLACEHOLDERS.NOTE_TITLE}
            </h4>
          </div>
          <div className={styles.noteActions}>
            <button 
              className={styles.deleteNoteButton} 
              onClick={() => handleDeleteNote(note)}
              aria-label={MESSAGES.BUTTONS.DELETE}
            >
              <img src={deleteIcon} alt={MESSAGES.BUTTONS.DELETE} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const GetNotes = ({ email, onAddNote, onEditNote }: GetNotesProps) => {
  const {
    filteredNotes,
    loading,
    searchQuery,
    setSearchQuery,
    handleDeleteNote
  } = useNotes({ email })
  
  return (
    <div className={styles.notesSection}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Your Notes</h2>
        <Button onClick={onAddNote} variant="secondary">
          <span>+</span> {MESSAGES.BUTTONS.ADD_NOTE}
        </Button>
      </div>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder={MESSAGES.PLACEHOLDERS.SEARCH_NOTES}
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <LoadingSpinner message={MESSAGES.LOADING.NOTES} />
      ) : (
        <NotesDisplay 
          notes={filteredNotes} 
          usedSearch={searchQuery.trim() !== ''} 
          onEditNote={onEditNote} 
          onDeleteNote={handleDeleteNote} 
        />
      )}
    </div>
  )
}

export default GetNotes

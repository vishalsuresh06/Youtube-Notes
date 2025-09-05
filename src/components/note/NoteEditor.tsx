import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { saveNote } from '../../utils/save-note'
import type { Note } from '../../types'
import styles from './note.module.css'

interface NoteEditorProps {
  initialNote?: Note
  onBack: () => void
}

const NoteEditor = ({ initialNote, onBack }: NoteEditorProps) => {
  const [title, setTitle] = useState(initialNote?.title || '')
  const [noteContent, setNoteContent] = useState(initialNote?.note || '')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)

  // Create the save function
  const performSave = useCallback(async () => {
    if (!title.trim() && !noteContent.trim()) {
      return // Don't save empty notes
    }

    setSaveStatus('saving')
    
    try {
      const savedNoteId = await saveNote(title, noteContent, noteId)
      if (savedNoteId && !noteId) {
        setNoteId(savedNoteId)
      }
      setSaveStatus('saved')
    } catch (error) {
      console.error('Failed to save note:', error)
      setSaveStatus('error')
    }
  }, [title, noteContent, noteId])

  // Create the debounced version
  const debouncedSave = useDebounce(performSave, 2000) // 2s delay

  // Auto-save when title or note changes
  useEffect(() => {
    if (initialNote) {
      // For existing notes, only save if content has changed
      if (title !== initialNote.title || noteContent !== initialNote.note) {
        debouncedSave()
      }
    } else {
      // For new notes, save if there's any content
      if (title || noteContent) {
        debouncedSave()
      }
    }
  }, [title, noteContent, debouncedSave, initialNote])

  const getStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return { text: 'Saving...', className: styles.statusSaving }
      case 'saved':
        return { text: 'Last Saved: ' + new Date().toLocaleString().split(',')[1], className: styles.statusSaved }
      case 'error':
        return { text: 'Save failed', className: styles.statusError }
      default:
        return null
    }
  }
  
  const statusMessage = getStatusMessage()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Go back">
        </button>
      </div>

      <div className={styles.editor}>
        <div className={styles.titleContainer}>
          <input 
            type="text" 
            className={styles.titleInput}
            placeholder="Untitled" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.contentContainer}>
          <textarea 
            className={styles.contentTextarea}
            placeholder="Start writing..." 
            value={noteContent} 
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.statusContainer}>
          {statusMessage && (
            <div className={statusMessage.className}>
              {statusMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteEditor

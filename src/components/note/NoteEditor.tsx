import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { checkYoutubeUrl, getCurrentTabUrl } from '../../utils'
import type { Note } from '../../types'
import styles from './note.module.css'

interface NoteEditorProps {
  initialNote?: Note
  onBack: () => void
}

const NoteEditor = ({ initialNote, onBack }: NoteEditorProps) => {
  const { createData, saveData } = useFirestoreCollection<Note>("notes")
  const [title, setTitle] = useState(initialNote?.title || '')
  const [noteContent, setNoteContent] = useState(initialNote?.note || '')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(
    initialNote?.updatedAt ? 
      (initialNote.updatedAt instanceof Date ? initialNote.updatedAt : (initialNote.updatedAt as any).toDate()) 
      : null
  )
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)

  // Create the save function
  const performSave = useCallback(async () => {
    if (!title.trim() && !noteContent.trim()) {
      return // Don't save empty notes
    }

    // For new notes, check if we're on YouTube
    if (!initialNote) {
      const currentTabUrl = await getCurrentTabUrl()
      if (!currentTabUrl || !checkYoutubeUrl(currentTabUrl)) {
        setSaveStatus('error')
        return
      }
    }

    setSaveStatus('saving')
    
    try {
      if (noteId) {
        // Update existing note - don't change URL
        const noteData = {
          title: title.trim(),
          note: noteContent.trim()
        } as Partial<Note>
        
        await saveData?.(noteId, noteData as Note)
      } else {
        // Create new note - set URL only on creation
        const currentUrl = await getCurrentTabUrl()
        const noteData = {
          title: title.trim(),
          note: noteContent.trim(),
          url: currentUrl || ''
        } as Note
        
        const docRef = await createData?.(noteData)
        if (docRef?.id) {
          setNoteId(docRef.id)
        }
      }
      
      setSaveStatus('saved')
      setLastSavedTime(new Date())
    } catch (error) {
      console.error('Failed to save note:', error)
      setSaveStatus('error')
    }
  }, [title, noteContent, noteId, createData, saveData, initialNote])

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

  const formatTime = (date: Date | any) => {
    // Ensure we have a proper Date object
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const getStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return { text: 'Saving...', className: styles.statusSaving }
      case 'idle':
      case 'saved':
        return lastSavedTime ? { text: 'Last Saved: ' + formatTime(lastSavedTime), className: styles.statusSaved } : null
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

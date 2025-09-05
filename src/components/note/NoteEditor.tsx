import React from 'react'
import { useNoteEditor } from '../../hooks/useNoteEditor'
import { MESSAGES } from '../../constants/messages'
import type { NoteEditorProps } from '../../types'
import styles from './note.module.css'

const NoteEditor = ({ initialNote, onBack }: NoteEditorProps) => {
  const {
    title,
    setTitle,
    noteContent,
    setNoteContent,
    saveStatus,
    lastSavedTime
  } = useNoteEditor({ initialNote })

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
        return { text: MESSAGES.LOADING.SAVING, className: styles.statusSaving }
      case 'idle':
      case 'saved':
        return lastSavedTime ? { 
          text: 'Last Saved: ' + formatTime(lastSavedTime), 
          className: styles.statusSaved 
        } : null
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
        <button 
          className={styles.backButton} 
          onClick={onBack} 
          aria-label={MESSAGES.BUTTONS.GO_BACK}
        />
      </div>

      <div className={styles.editor}>
        <div className={styles.titleContainer}>
          <input 
            type="text" 
            className={styles.titleInput}
            placeholder={MESSAGES.PLACEHOLDERS.NOTE_TITLE}
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.contentContainer}>
          <textarea 
            className={styles.contentTextarea}
            placeholder={MESSAGES.PLACEHOLDERS.NOTE_CONTENT}
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

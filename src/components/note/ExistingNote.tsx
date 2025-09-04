import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { saveNote } from '../../utils/save-note'
import type { Note } from '../../types'

interface ExistingNoteProps {
  note: Note
  onBack: () => void
}

const ExistingNote = ({ note, onBack }: ExistingNoteProps) => {
  const [title, setTitle] = useState(note.title || '')
  const [noteContent, setNoteContent] = useState(note.note || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Create the save function
  const performSave = useCallback(async () => {
    if (!title.trim() && !noteContent.trim()) {
      return // Don't save empty notes
    }

    setIsSaving(true)
    setSaveStatus('saving')
    
    try {
      await saveNote(title, noteContent, note.id)
      setSaveStatus('saved')
      // Clear the saved status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Failed to save note:', error)
      setSaveStatus('error')
      // Clear the error status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }, [title, noteContent, note.id])

  // Create the debounced version
  const debouncedSave = useDebounce(performSave, 800) // 800ms delay

  // Auto-save when title or note changes
  useEffect(() => {
    if (title !== note.title || noteContent !== note.note) {
      debouncedSave()
    }
  }, [title, noteContent, debouncedSave, note.title, note.note])

  // Manual save function for the button
  const handleManualSave = () => {
    performSave()
  }

  const getStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return { text: 'Saving...', className: 'status-saving' }
      case 'saved':
        return { text: 'Saved!', className: 'status-saved' }
      case 'error':
        return { text: 'Save failed', className: 'status-error' }
      default:
        return null
    }
  }
  
  const statusMessage = getStatusMessage()

  return (
    <div>
      <div>
        <button onClick={onBack}>
          ← Back
        </button>
      </div>

      <div>
        <div>
          <input 
            type="text" 
            placeholder="Untitled" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div>
          <textarea 
            placeholder="Start writing..." 
            value={noteContent} 
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
      </div>

      <div>
        {statusMessage && (
          <div className={statusMessage.className}>
            {statusMessage.text}
          </div>
        )}
        <button 
          onClick={handleManualSave} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default ExistingNote

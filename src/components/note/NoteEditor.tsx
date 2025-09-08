import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { checkYoutubeUrl, getCurrentTabUrl } from '../../utils'
import InfoPopup from './info-popup/InfoPopup'
import type { Note } from '../../types'
import YoutubeIcon from '../../../assets/youtube.svg'
import infoIcon from '../../../assets/info.svg'
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
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(
    initialNote?.updatedAt ? 
      (initialNote.updatedAt instanceof Date ? initialNote.updatedAt : (initialNote.updatedAt as any).toDate()) 
      : null
  )
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for specific shortcuts only
      if (event.metaKey) {
        const key = event.key.toLowerCase()
        
        // Define the shortcuts we want to capture
        const shortcuts = ['arrowdown', 's', 'b', 'i', 'y', 'arrowleft']
        
        if (shortcuts.includes(key)) {
          event.preventDefault() // Prevent default browser action
          
          console.log('Shortcut detected:', {
            key: event.key,
            combination: `⌘${key === 'arrowdown' ? '↓' : key === 'arrowleft' ? '←' : event.key.toUpperCase()}`
          })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Create the save function
  const performSave = useCallback(async () => {
    if (!title.trim() && !noteContent.trim()) {
      return // Don't save empty notes
    }

    setSaveStatus('saving')
    
    try {
      if (noteId) {
        // Update existing note - only update title and content, preserve original URL
        const noteData = {
          title: title.trim(),
          note: noteContent.trim()
        } as Partial<Note>
        
        await saveData?.(noteId, noteData as Note)
      } else {
        // Create new note - check if we're on YouTube and set URL only once
        const currentUrl = await getCurrentTabUrl()
        if (!currentUrl || !checkYoutubeUrl(currentUrl)) {
          setSaveStatus('error')
          return
        }
        
        const noteData = {
          title: title.trim(),
          note: noteContent.trim(),
          url: currentUrl
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
  }, [title, noteContent, noteId, createData, saveData])

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

  const openYoutubeLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  const statusMessage = getStatusMessage()

  const handleInfoClick = () => {
    setIsInfoOpen(!isInfoOpen)

  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Go back"></button>
        <div className={styles.headerSpacer}></div>
        <button className={styles.youtubeButton} onClick={() => openYoutubeLink(initialNote.url)}>
          <img src={YoutubeIcon} alt="YouTube" className={styles.youtubeIcon} />
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
        <div className={styles.footerSpacer}></div>
        <div className={styles.infoContainer}>
          <button className={styles.infoButton} onClick={handleInfoClick}>
            <img src={infoIcon} alt="Info" className={styles.infoIcon} />
          </button>
        </div>
      </div>
      {isInfoOpen && <InfoPopup open={isInfoOpen} onClose={() => setIsInfoOpen(false)} />}
    </div>
  )
}

export default NoteEditor

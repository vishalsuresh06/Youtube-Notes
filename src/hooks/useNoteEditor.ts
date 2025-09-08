import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from './useDebounce'
import { useFirestoreCollection } from './useFirestoreCollection'
import { checkYoutubeUrl, getCurrentTabUrl } from '../utils'
import type { Note } from '../types'

/**
 * Custom hook for managing note editor state and functionality
 * Handles note creation, editing, auto-saving, and synchronization with Firestore
 */
export const useNoteEditor = (initialNote?: Note) => {
  // Firestore operations for note data persistence
  const { createData, saveData } = useFirestoreCollection<Note>("notes")
  
  // Core note state
  const [title, setTitle] = useState(initialNote?.title || '')
  const [noteContent, setNoteContent] = useState(initialNote?.note || '')
  
  // Save operation status tracking
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  
  // Track when the note was last saved, handling Firestore timestamp conversion
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(
    initialNote?.updatedAt ? 
      (initialNote.updatedAt instanceof Date ? initialNote.updatedAt : (initialNote.updatedAt as any).toDate()) 
      : null
  )
  
  // Unique identifier for the note in Firestore
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)
  
  // Text formatting state (currently unused but available for rich text features)
  const [boldActive, setBoldActive] = useState(false)
  const [italicActive, setItalicActive] = useState(false)

  /**
   * Performs the actual save operation to Firestore
   * Handles both creating new notes and updating existing ones
   */
  const performSave = useCallback(async () => {
    // Skip saving if both title and content are empty
    if (!title.trim() && !noteContent.trim()) {
      return
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
        // Create new note - verify we're on a YouTube page before saving
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

  // Create debounced version of save function to prevent excessive API calls
  const debouncedSave = useDebounce(performSave, 5000) // 5 second delay

  /**
   * Auto-save effect that triggers when title or note content changes
   * Different behavior for new vs existing notes
   */
  useEffect(() => {
    if (initialNote) {
      // For existing notes, only save if content has actually changed from initial values
      if (title !== initialNote.title || noteContent !== initialNote.note) {
        debouncedSave()
      }
    } else {
      // For new notes, save as soon as there's any content
      if (title || noteContent) {
        debouncedSave()
      }
    }
  }, [title, noteContent, debouncedSave, initialNote])

  return {
    // Current state values
    title,
    noteContent,
    saveStatus,
    lastSavedTime,
    noteId,
    
    // State setters and actions
    setTitle,
    setNoteContent,
    performSave // Manual save function for immediate saves
  }
}
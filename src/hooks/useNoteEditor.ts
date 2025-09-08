import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from './useDebounce'
import { useFirestoreCollection } from './useFirestoreCollection'
import { checkYoutubeUrl, getCurrentTabUrl } from '../utils'
import type { Note } from '../types'

export const useNoteEditor = (initialNote?: Note) => {
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
  const [boldActive, setBoldActive] = useState(false)
  const [italicActive, setItalicActive] = useState(false)

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
  const debouncedSave = useDebounce(performSave, 5000) // 2s delay

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

  return {
    // State
    title,
    noteContent,
    saveStatus,
    lastSavedTime,
    noteId,
    
    // Actions
    setTitle,
    setNoteContent,
    performSave
  }
}
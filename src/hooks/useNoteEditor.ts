import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from './useDebounce'
import { saveNote, checkYoutubeUrl, getCurrentTabUrl } from '../utils'
import type { Note } from '../types'

interface UseNoteEditorOptions {
  initialNote?: Note
}

interface UseNoteEditorReturn {
  title: string
  setTitle: (title: string) => void
  noteContent: string
  setNoteContent: (content: string) => void
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  lastSavedTime: Date | null
  noteId: string | null
  saveNote: () => Promise<void>
}

export const useNoteEditor = ({ initialNote }: UseNoteEditorOptions): UseNoteEditorReturn => {
  const [title, setTitle] = useState(initialNote?.title || '')
  const [noteContent, setNoteContent] = useState(initialNote?.note || '')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(
    initialNote?.updatedAt ? 
      (initialNote.updatedAt instanceof Date ? initialNote.updatedAt : (initialNote.updatedAt as any).toDate()) 
      : null
  )
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)

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
      const { noteId: savedNoteId, savedAt } = await saveNote(title, noteContent, noteId)
      if (savedNoteId && !noteId) {
        setNoteId(savedNoteId)
      }
      setSaveStatus('saved')
      setLastSavedTime(savedAt)
    } catch (error) {
      console.error('Failed to save note:', error)
      setSaveStatus('error')
    }
  }, [title, noteContent, noteId, initialNote])

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

  return {
    title,
    setTitle,
    noteContent,
    setNoteContent,
    saveStatus,
    lastSavedTime,
    noteId,
    saveNote: performSave
  }
}

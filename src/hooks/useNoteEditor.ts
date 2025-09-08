import { useState, useCallback, useEffect, useRef } from 'react'
import { useDebounce } from './useDebounce'
import { useFirestoreCollection } from './useFirestoreCollection'
import { checkYoutubeUrl, getCurrentTabUrl } from '../utils'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
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

  // Stable references that don't trigger re-renders
  const editorRef = useRef<any>(null)
  const initialContentRef = useRef(initialNote?.note || '')
  const lastSavedContentRef = useRef(initialNote?.note || '')
  
  // Track content changes for auto-save
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Initialize TipTap editor for rich text editing
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContentRef.current,
    onCreate: ({ editor }) => {
      editorRef.current = editor
    },
    onUpdate: ({ editor }) => {
      editorRef.current = editor
      // Check if content has actually changed
      const currentContent = editor.getHTML()
      if (currentContent !== lastSavedContentRef.current) {
        setHasUnsavedChanges(true)
      }
    },
    onDestroy: () => {
      editorRef.current = null
    }
  })

  /**
   * Performs the actual save operation to Firestore
   * Handles both creating new notes and updating existing ones
   */
  const performSave = useCallback(async () => {
    const currentEditor = editorRef.current
    
    // Skip saving if both title and content are empty (for new notes)
    if (!currentEditor) return
    
    const hasTitle = title.trim().length > 0
    const hasContent = !currentEditor.isEmpty
    
    // For new notes, require at least title OR content
    if (!initialNote && !hasTitle && !hasContent) {
      return
    }
    
    // For existing notes, allow saving even if title is empty (user might want to clear title)
    if (initialNote && !hasTitle && !hasContent) {
      return  // Don't save completely empty existing notes
    }

    setSaveStatus('saving')
    
    try {
      const currentContent = currentEditor.getHTML()
      
      if (noteId) {
        // Update existing note - only update title and content, preserve original URL
        const noteData = {
          title: title.trim(),
          note: currentContent
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
          note: currentContent,
          url: currentUrl
        } as Note
        
        const docRef = await createData?.(noteData)
        if (docRef?.id) {
          setNoteId(docRef.id)
        }
      }
      
      // Update our tracking refs after successful save
      lastSavedContentRef.current = currentContent
      setHasUnsavedChanges(false)
      setSaveStatus('saved')
      setLastSavedTime(new Date())
    } catch (error) {
      console.error('Failed to save note:', error)
      setSaveStatus('error')
    }
  }, [title, noteId, createData, saveData])

  // Create debounced version of save function - must be at top level
  const debouncedSave = useDebounce(performSave, 2000)

  /**
   * Simplified auto-save logic - triggers on title or content changes
   */
  useEffect(() => {
    // Only save if we have actual changes
    if (hasUnsavedChanges) {
      debouncedSave()
    }
  }, [hasUnsavedChanges, debouncedSave])

  /**
   * Track title changes to trigger unsaved state
   */
  useEffect(() => {
    if (title !== (initialNote?.title || '')) {
      setHasUnsavedChanges(true)
    }
  }, [title, initialNote?.title])

  return {
    // Current state values
    title,
    saveStatus,
    lastSavedTime,
    noteId,
    hasUnsavedChanges,

    editor, // TipTap editor instance
    
    // State setters and actions
    setTitle,
    performSave, // Manual save function for immediate saves
    
    // Utility functions
    getNoteContent: () => editorRef.current?.getHTML() || '',
    getPlainTextContent: () => editorRef.current?.getText() || '',
    hasContent: () => !editorRef.current?.isEmpty
  }
}
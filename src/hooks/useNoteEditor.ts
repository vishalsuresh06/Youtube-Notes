import { Placeholder } from "@tiptap/extensions"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useCallback, useEffect, useRef, useState } from "react"

import type { Note } from "../types"
import { checkYoutubeUrl, getCurrentTabUrl } from "../utils"
import { useDebounce } from "./useDebounce"
import { useFirestoreCollection } from "./useFirestoreCollection"

/**
 * Custom hook for managing note editor state and functionality
 * Handles note creation, editing, auto-saving, and synchronization with Firestore
 */
export const useNoteEditor = (initialNote?: Note) => {
  // Firestore operations for note data persistence
  const { createData, saveData } = useFirestoreCollection<Note>("notes")
  const [title, setTitle] = useState(initialNote?.title || "")
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle")

  // Track when the note was last saved, handling Firestore timestamp conversion
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(
    initialNote?.updatedAt
      ? initialNote.updatedAt instanceof Date
        ? initialNote.updatedAt
        : (initialNote.updatedAt as any).toDate()
      : null
  )

  // Unique identifier for the note in Firestore
  const [noteId, setNoteId] = useState<string | null>(initialNote?.id || null)

  // Stable references that don't trigger re-renders
  const editorRef = useRef<any>(null)
  const initialContentRef = useRef(initialNote?.note || "")
  const lastSavedContentRef = useRef(initialNote?.note || "")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your note..."
      })
    ],
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
    if (!initialNote && !hasTitle && !hasContent) return
    if (initialNote && !hasTitle && !hasContent) return

    setSaveStatus("saving")

    try {
      const currentContent = currentEditor.getHTML()

      if (noteId) {
        const noteData = {
          title: title.trim(),
          note: currentContent
        } as Partial<Note>

        await saveData?.(noteId, noteData as Note)
      } else {
        const currentUrl = await getCurrentTabUrl()
        if (!currentUrl || !checkYoutubeUrl(currentUrl)) {
          setSaveStatus("error")
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

      lastSavedContentRef.current = currentContent
      setHasUnsavedChanges(false)
      setSaveStatus("saved")
      setLastSavedTime(new Date())
    } catch (error) {
      console.error("Failed to save note:", error)
      setSaveStatus("error")
    }
  }, [title, noteId, createData, saveData])

  const debouncedSave = useDebounce(performSave, 2000)

  /**
   * Simplified auto-save logic - triggers on title or content changes
   */
  useEffect(() => {
    if (hasUnsavedChanges) {
      debouncedSave()
    }
  }, [hasUnsavedChanges, debouncedSave])

  /**
   * Track title changes to trigger unsaved state
   */
  useEffect(() => {
    if (title !== (initialNote?.title || "")) {
      setHasUnsavedChanges(true)
    }
  }, [title, initialNote?.title])

  return {
    title,
    saveStatus,
    lastSavedTime,
    noteId,
    hasUnsavedChanges,
    editor, // TipTap editor instance
    setTitle,
    performSave, // Manual save function for immediate saves
    getNoteContent: () => editorRef.current?.getHTML() || "",
    getPlainTextContent: () => editorRef.current?.getText() || "",
    hasContent: () => !editorRef.current?.isEmpty
  }
}

import { useState, useEffect, useCallback } from 'react'
import { getAllNotes, deleteNote } from '../utils'
import type { Note } from '../types'

interface UseNotesOptions {
  email: string | null
}

interface UseNotesReturn {
  notes: Note[]
  filteredNotes: Note[]
  loading: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleDeleteNote: (noteId: string) => void
  refreshNotes: () => Promise<void>
}

export const useNotes = ({ email }: UseNotesOptions): UseNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

  // Filter notes based on search query
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filtered = notes.filter(note => 
        note.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
      )
      setFilteredNotes(filtered)
    } else {
      setFilteredNotes(notes)
    }
  }, [searchQuery, notes])

  // Fetch notes when email changes
  const fetchNotes = useCallback(async () => {
    if (!email) return

    setLoading(true)
    try {
      const fetchedNotes = await getAllNotes(email)
      setNotes(fetchedNotes)
    } catch (error) {
      console.error('Failed to fetch notes:', error)
    } finally {
      setLoading(false)
    }
  }, [email])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleDeleteNote = useCallback(async (noteId: string) => {
    try {
      await deleteNote(noteId)
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }, [])

  const refreshNotes = useCallback(async () => {
    await fetchNotes()
  }, [fetchNotes])

  return {
    notes,
    filteredNotes,
    loading,
    searchQuery,
    setSearchQuery,
    handleDeleteNote,
    refreshNotes
  }
}

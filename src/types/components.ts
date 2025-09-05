import type { Note, ViewType, SaveStatus } from './index'

// Component Props Types
export interface DashboardProps {
  onViewChange?: (view: ViewType) => void
}

export interface GetNotesProps {
  email: string | null
  onAddNote: () => void
  onEditNote: (note: Note) => void
}

export interface NotesDisplayProps {
  notes: Note[]
  usedSearch: boolean
  onEditNote: (note: Note) => void
  onDeleteNote: (noteId: string) => void
}

export interface NewNoteProps {
  onBack: () => void
}

export interface ExistingNoteProps {
  note: Note
  onBack: () => void
}

export interface NoteEditorProps {
  initialNote?: Note
  onBack: () => void
}

export interface UserHeaderProps {
  displayName: string | null
  email: string | null
  onLogout: () => void
}

export interface LoginPageProps {
  onLogin: () => void
  isLoading: boolean
}

export interface YTWarningPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Hook Return Types
export interface UseNotesReturn {
  notes: Note[]
  filteredNotes: Note[]
  loading: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleDeleteNote: (noteId: string) => void
  refreshNotes: () => Promise<void>
}

export interface UseYouTubeValidationReturn {
  isValidYouTube: boolean
  isLoading: boolean
  currentUrl: string | null
  checkUrl: () => Promise<void>
}

export interface UseNoteEditorReturn {
  title: string
  setTitle: (title: string) => void
  noteContent: string
  setNoteContent: (content: string) => void
  saveStatus: SaveStatus
  lastSavedTime: Date | null
  noteId: string | null
  saveNote: () => Promise<void>
}

// API Response Types
export interface SaveNoteResponse {
  noteId: string
  savedAt: Date
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: unknown
}

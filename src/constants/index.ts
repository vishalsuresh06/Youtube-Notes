// App configuration constants
export const APP_CONFIG = {
  DEBOUNCE_DELAY: 2000, // 2 seconds for auto-save
  COLLECTIONS: {
    USERS: 'users',
    NOTES: 'notes'
  }
} as const

// View types
export const VIEW_TYPES = {
  DASHBOARD: 'dashboard',
  NEW_NOTE: 'new-note',
  EDIT_NOTE: 'edit-note'
} as const

export type ViewType = typeof VIEW_TYPES[keyof typeof VIEW_TYPES]

// Save status types
export const SAVE_STATUS = {
  IDLE: 'idle',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error'
} as const

export type SaveStatus = typeof SAVE_STATUS[keyof typeof SAVE_STATUS]

// Re-export messages
export { MESSAGES } from './messages'

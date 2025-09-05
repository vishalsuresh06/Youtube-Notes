// App configuration constants
export const APP_CONFIG = {
  DEBOUNCE_DELAY: 2000, // 2 seconds for auto-save
  YOUTUBE_DOMAINS: ['youtube.com', 'www.youtube.com', 'm.youtube.com'],
  YOUTUBE_VIDEO_REGEX: /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/,
  COLLECTIONS: {
    USERS: 'users',
    NOTES: 'notes'
  }
} as const

// UI constants
export const UI_CONSTANTS = {
  COLORS: {
    BACKGROUND: '#111111',
    TEXT_PRIMARY: '#e2e8f0',
    TEXT_SECONDARY: '#94a3b8',
    ERROR: '#ef4444',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b'
  },
  FONT_FAMILY: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  BORDER_RADIUS: '8px',
  SPACING: {
    SM: '8px',
    MD: '16px',
    LG: '24px',
    XL: '32px'
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

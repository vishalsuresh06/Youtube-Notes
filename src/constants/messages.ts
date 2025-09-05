// User-facing messages
export const MESSAGES = {
  LOADING: {
    NOTES: 'Loading notes...',
    CHECKING_URL: 'Checking URL...',
    SAVING: 'Saving...'
  },
  ERRORS: {
    AUTHENTICATION_REQUIRED: 'User must be authenticated to access notes',
    EMPTY_NOTE: 'Cannot save empty notes',
    YOUTUBE_REQUIRED: 'You can only create new notes on YouTube videos',
    FETCH_NOTES_FAILED: 'Failed to fetch notes',
    DELETE_NOTE_FAILED: 'Failed to delete note',
    SAVE_NOTE_FAILED: 'Failed to save note',
    URL_CHECK_FAILED: 'Failed to check URL'
  },
  SUCCESS: {
    NOTE_SAVED: 'Note saved successfully',
    NOTE_DELETED: 'Note deleted successfully'
  },
  PLACEHOLDERS: {
    SEARCH_NOTES: 'Search notes...',
    NOTE_TITLE: 'Untitled',
    NOTE_CONTENT: 'Start writing...'
  },
  EMPTY_STATES: {
    NO_NOTES_TITLE: 'No notes found',
    NO_NOTES_MESSAGE: 'Start by creating your first note!',
    NO_SEARCH_RESULTS: 'Try a different search!'
  },
  WARNINGS: {
    NOT_YOUTUBE_TITLE: 'Not a YouTube video',
    NOT_YOUTUBE_MESSAGE: 'You can only create new notes on YouTube videos'
  },
  BUTTONS: {
    ADD_NOTE: 'Add Note',
    GO_BACK: 'Go Back',
    DELETE: 'Delete'
  }
} as const

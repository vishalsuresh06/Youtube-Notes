// Helper functions for note operations

export const formatTime = (date: Date | any) => {
  // Ensure we have a proper Date object
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

export const getStatusMessage = (
  saveStatus: 'idle' | 'saving' | 'saved' | 'error',
  lastSavedTime: Date | null,
  styles: any
) => {
  switch (saveStatus) {
    case 'saving':
      return { text: 'Saving...', className: styles.statusSaving }
    case 'idle':
    case 'saved':
      return lastSavedTime ? 
        { text: 'Last Saved: ' + formatTime(lastSavedTime), className: styles.statusSaved } : 
        null
    case 'error':
      return { text: 'Save failed', className: styles.statusError }
    default:
      return null
  }
}

export const openYoutubeLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
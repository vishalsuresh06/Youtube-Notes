import { useEffect } from 'react'

interface KeyboardShortcutHandlers {
  onSave?: () => void
  onBack?: () => void
  onTimestamp?: () => void
  onBold?: () => void
  onItalic?: () => void
  onYoutube?: () => void
}

export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for specific shortcuts only
      if (event.metaKey) {
        const key = event.key.toLowerCase()
        
        // Define the shortcuts we want to capture
        const shortcuts = ['arrowdown', 's', 'b', 'i', 'y', 'arrowleft']
        
        if (shortcuts.includes(key)) {
          event.preventDefault() // Prevent default browser action
          
          switch (key) {
            case 's':
              handlers.onSave?.()
              break
            case 'arrowleft':
              handlers.onBack?.()
              break
            case 'arrowdown':
              handlers.onTimestamp?.()
              break
            case 'y':
              handlers.onYoutube?.()
              break
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlers])
}
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
            case 'arrowleft':
              handlers.onBack?.()
              break
            case 's':
              handlers.onSave?.()
              break
            case 'arrowdown':
              handlers.onTimestamp?.()
              break
            case 'b':
              handlers.onBold?.()
              break
            case 'i':
              handlers.onItalic?.()
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
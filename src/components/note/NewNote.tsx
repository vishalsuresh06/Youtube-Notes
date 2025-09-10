import React, { useEffect, useState } from "react"

import { noteStyles as styles } from "../../styles"
import { checkYoutubeUrl, getCurrentTabUrl } from "../../utils"
import { NoteEditor, YTWarningPopup } from "./index"

interface NewNoteProps {
  onBack: () => void
}

const NewNote = ({ onBack }: NewNoteProps) => {
  const [showWarning, setShowWarning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUrl = async () => {
      const currentTabUrl = await getCurrentTabUrl()
      const isYouTube = currentTabUrl ? checkYoutubeUrl(currentTabUrl) : false

      if (!isYouTube) {
        setShowWarning(true)
        // Auto-navigate back after showing warning
        setTimeout(() => {
          onBack()
        }, 100)
      }

      setIsLoading(false)
    }

    checkUrl()
  }, [onBack])

  const handleCloseWarning = () => {
    setShowWarning(false)
    onBack()
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <p className={styles.loadingText}>Checking URL...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <NoteEditor onBack={onBack} />
      <YTWarningPopup isOpen={showWarning} onClose={handleCloseWarning} />
    </>
  )
}

export default NewNote

import React, { useState, useEffect } from 'react'
import NoteEditor from './NoteEditor'
import { checkYoutubeUrl, getCurrentTabUrl } from '../../utils'
import { YTWarningPopup } from './index'
import styles from './note.module.css'

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
      setShowWarning(!isYouTube)
      setIsLoading(false)
    }
    
    checkUrl()
  }, [])

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <p className={styles.loadingText}>
            Checking URL...
          </p>
        </div>
      </div>
    )
  }

  if (showWarning) {
    return (
      <>
        <div className={styles.warningContainer}>
          <div className={styles.warningContent}>
            <h2 className={styles.warningTitle}>
              Not a YouTube video
            </h2>
            <p className={styles.warningMessage}>
              You can only create new notes on YouTube videos
            </p>
            <button 
              onClick={onBack}
              className={styles.warningButton}
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    )
  }

  return <NoteEditor onBack={onBack} />
}

export default NewNote
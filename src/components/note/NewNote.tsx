import React from 'react'
import NoteEditor from './NoteEditor'
import { useYouTubeValidation } from '../../hooks/useYouTubeValidation'
import { Button, LoadingSpinner, EmptyState } from '../ui'
import { UI_CONSTANTS } from '../../constants'
import { MESSAGES } from '../../constants/messages'
import type { NewNoteProps } from '../../types'
import styles from './NewNote.module.css'

const NewNote: React.FC<NewNoteProps> = ({ onBack }) => {
  const { isValidYouTube, isLoading } = useYouTubeValidation()

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner message={MESSAGES.LOADING.CHECKING_URL} />
      </div>
    )
  }

  if (!isValidYouTube) {
    return (
      <div className={styles.container}>
        <EmptyState
          title={MESSAGES.WARNINGS.NOT_YOUTUBE_TITLE}
          message={MESSAGES.WARNINGS.NOT_YOUTUBE_MESSAGE}
          action={
            <Button onClick={onBack} variant="danger">
              {MESSAGES.BUTTONS.GO_BACK}
            </Button>
          }
        />
      </div>
    )
  }

  return <NoteEditor onBack={onBack} />
}

export default NewNote
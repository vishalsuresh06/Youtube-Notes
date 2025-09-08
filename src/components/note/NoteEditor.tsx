import React, { useState } from 'react'
import { useNoteEditor } from '../../hooks/useNoteEditor'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { getStatusMessage, openYoutubeLink } from '../../utils/noteHelpers'
import InfoPopup from './info-popup/InfoPopup'
import type { Note } from '../../types'
import YoutubeIcon from '../../../assets/youtube.svg'
import infoIcon from '../../../assets/info.svg'
import styles from './note.module.css'
import { EditorContent } from '@tiptap/react'

interface NoteEditorProps {
  initialNote?: Note
  onBack: () => void
}

const NoteEditor = ({ initialNote, onBack }: NoteEditorProps) => {
  // Custom hooks for note editing logic
  const {
    title,
    saveStatus,
    lastSavedTime,
    editor,
    hasUnsavedChanges,
    setTitle,
    performSave
  } = useNoteEditor(initialNote)

  // Local UI state
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: performSave,
    onBack,
    onYoutube: () => initialNote?.url && openYoutubeLink(initialNote.url),
    onTimestamp: () => console.log('Timestamp shortcut'),
  })

  // Event handlers
  const handleInfoClick = () => {
    setIsInfoOpen(!isInfoOpen)
  }

  // Computed values
  const statusMessage = getStatusMessage(saveStatus, lastSavedTime, styles)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Go back"></button>
        <div className={styles.headerSpacer}></div>
        <button className={styles.youtubeButton} onClick={() => initialNote?.url && openYoutubeLink(initialNote.url)}>
          <img src={YoutubeIcon} alt="YouTube" className={styles.youtubeIcon} />
        </button>
      </div>

      <div className={styles.editor}>
        <div className={styles.titleContainer}>
          <input 
            type="text" 
            className={styles.titleInput}
            placeholder="Untitled" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.contentContainer}>
          {editor ? (
            <EditorContent editor={editor} className={styles.tiptapEditor} />
          ) : (
            <div className={styles.editorPlaceholder}>Loading editor...</div>
          )}
        </div>


      </div>

      <div className={styles.footer}>
        <div className={styles.statusContainer}>
          {statusMessage && (
            <div className={statusMessage.className}>
              {statusMessage.text}
              {hasUnsavedChanges && saveStatus === 'idle' && ' • Unsaved changes'}
            </div>
          )}
        </div>
        <div className={styles.footerSpacer}></div>
        <div className={styles.infoContainer}>
          <button className={styles.infoButton} onClick={handleInfoClick}>
            <img src={infoIcon} alt="Info" className={styles.infoIcon} />
          </button>
        </div>
      </div>
      {isInfoOpen && <InfoPopup open={isInfoOpen} onClose={() => setIsInfoOpen(false)} />}
    </div>
  )
}

export default NoteEditor
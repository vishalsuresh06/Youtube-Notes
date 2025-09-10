import { EditorContent } from "@tiptap/react"
import React, { useState } from "react"

import { AddIcon, AIIcon, InfoIcon, YoutubeIcon } from "../../assets/icons"
import { useKeyboardShortcuts, useNoteEditor } from "../../hooks"
import { noteStyles as styles } from "../../styles"
import type { Note } from "../../types"
import { getStatusMessage, openYoutubeLink } from "../../utils"
import { InfoPopup } from "./info-popup"

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
    onTimestamp: () => console.log("Timestamp shortcut")
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
        <button
          className={styles.backButton}
          onClick={onBack}
          aria-label="Go back"></button>
        <div className={styles.headerSpacer}></div>
        <button className={styles.actionButton}>
          <img src={AIIcon} alt="YouTube" className={styles.aIIcon} />
        </button>
        <button className={styles.actionButton}>
          <img src={AddIcon} alt="YouTube" className={styles.addIcon} />
        </button>
        <button
          className={styles.actionButton}
          onClick={() => initialNote?.url && openYoutubeLink(initialNote.url)}>
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

        {editor ? (
          <EditorContent editor={editor} className={styles.tiptapEditor} />
        ) : (
          <div className={styles.editorPlaceholder}>Loading editor...</div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.statusContainer}>
          {statusMessage && (
            <div className={statusMessage.className}>
              {statusMessage.text}
              {hasUnsavedChanges &&
                saveStatus === "idle" &&
                " • Unsaved changes"}
            </div>
          )}
        </div>
        <div className={styles.footerSpacer}></div>
        <div className={styles.infoContainer}>
          <button className={styles.infoButton} onClick={handleInfoClick}>
            <img src={InfoIcon} alt="Info" className={styles.infoIcon} />
          </button>
        </div>
      </div>
      {isInfoOpen && (
        <InfoPopup open={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      )}
    </div>
  )
}

export default NoteEditor

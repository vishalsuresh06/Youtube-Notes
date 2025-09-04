import React from 'react'
import styles from './dashboard.module.css'

const GetNotes = () => {
  return (
    <div className={styles.notesSection}>
      <h3>Your Notes</h3>
      <div className={styles.notesContent}>
        <p>No notes yet. Start taking notes while watching YouTube videos!</p>
        <button className={styles.primaryButton}>
          Create First Note
        </button>
      </div>
    </div>
  )
}

export default GetNotes
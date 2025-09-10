import React from 'react'
import { dashboardStyles as styles } from '../../styles'

const GetNotes = () => {
  return (
    <div className={styles.notesSection}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Your Notes</h2>
      </div>
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>YouTube Notes Extension</h3>
        <p className={styles.emptyStateText}>
          Ready for database integration
        </p>
      </div>
    </div>
  )
}

export default GetNotes

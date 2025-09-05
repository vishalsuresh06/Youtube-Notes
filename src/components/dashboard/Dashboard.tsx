import React, { useState } from 'react'
import { useFirebase } from '../../firebase/hook'
import { useYouTubeValidation } from '../../hooks/useYouTubeValidation'
import { UserHeader, GetNotes } from './index'
import { NewNote, ExistingNote, YTWarningPopup } from '../note'
import { VIEW_TYPES } from '../../constants'
import type { DashboardProps, Note, ViewType } from '../../types'
import styles from './dashboard.module.css'

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const { user, onLogout } = useFirebase()
  const { isValidYouTube } = useYouTubeValidation()
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.DASHBOARD)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const handleAddNote = async () => {
    if (!isValidYouTube) {
      setShowWarning(true)
      return
    }
    
    setCurrentView(VIEW_TYPES.NEW_NOTE)
    onViewChange?.(VIEW_TYPES.NEW_NOTE)
  }

  const handleEditNote = (note: Note) => {
    setSelectedNote(note)
    setCurrentView(VIEW_TYPES.EDIT_NOTE)
    onViewChange?.(VIEW_TYPES.EDIT_NOTE)
  }

  const handleBackToDashboard = () => {
    setCurrentView(VIEW_TYPES.DASHBOARD)
    setSelectedNote(null)
    onViewChange?.(VIEW_TYPES.DASHBOARD)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {currentView === VIEW_TYPES.DASHBOARD && (
          <>
            <UserHeader 
              displayName={user?.displayName}
              email={user?.email}
              onLogout={onLogout}
            />
            <hr className={styles.divider} />
          </>
        )}
        
        {currentView === VIEW_TYPES.DASHBOARD ? (
          <GetNotes 
            email={user?.email} 
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
          />
        ) : currentView === VIEW_TYPES.NEW_NOTE ? (
          <NewNote onBack={handleBackToDashboard} />
        ) : (
          selectedNote && <ExistingNote note={selectedNote} onBack={handleBackToDashboard} />
        )}
      </div>
      
      <YTWarningPopup 
        isOpen={showWarning} 
        onClose={() => setShowWarning(false)} 
      />
    </div>
  )
}

export default Dashboard
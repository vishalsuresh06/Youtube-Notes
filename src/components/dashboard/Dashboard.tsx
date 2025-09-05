import React, { useState } from 'react'
import { useFirebase } from '../../firebase/hook'
import { useYouTubeValidation } from '../../hooks/useYouTubeValidation'
import { getCurrentTabUrl, checkYoutubeUrl } from '../../utils'
import { UserHeader, GetNotes } from './index'
import { NewNote, ExistingNote, YTWarningPopup } from '../note'
import { VIEW_TYPES } from '../../constants'
import type { DashboardProps, Note, ViewType } from '../../types'
import styles from './dashboard.module.css'

const Dashboard = ({ onViewChange }: DashboardProps) => {
  const { user, onLogout, onSwitchAccount } = useFirebase()
  const { isValidYouTube, checkUrl } = useYouTubeValidation()
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.DASHBOARD)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const handleAddNote = async () => {
    // Always check the current URL before proceeding
    await checkUrl()
    
    // Get the updated validation state after checking
    const url = await getCurrentTabUrl()
    const isValid = url ? checkYoutubeUrl(url) : false
    
    if (!isValid) {
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
              onSwitchAccount={onSwitchAccount}
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
import React, { useState } from 'react'
import { useFirebase } from '../../firebase/hook'
import { UserHeader, GetNotes } from './index'
import { NewNote, ExistingNote, YTWarningPopup } from '../note'
import { checkYoutubeUrl, getCurrentTabUrl } from '../../utils'
import type { Note } from '../../types'
import { dashboardStyles as styles } from '../../styles'

interface DashboardProps {
  onViewChange?: (view: 'dashboard' | 'new-note' | 'edit-note') => void
}

const Dashboard = ({ onViewChange }: DashboardProps) => {
  const { user, onLogout } = useFirebase()
  const [currentView, setCurrentView] = useState<'dashboard' | 'new-note' | 'edit-note'>('dashboard')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const handleAddNote = async () => {
    const currentTabUrl = await getCurrentTabUrl()
    
    if (!currentTabUrl || !checkYoutubeUrl(currentTabUrl)) {
      setShowWarning(true)
      return
    }
    
    setCurrentView('new-note')
    onViewChange?.('new-note')
  }

  const handleEditNote = (note: Note) => {
    setSelectedNote(note)
    setCurrentView('edit-note')
    onViewChange?.('edit-note')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedNote(null)
    onViewChange?.('dashboard')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {currentView === 'dashboard' && (
          <>
            <UserHeader 
              displayName={user?.displayName}
              email={user?.email}
              onLogout={onLogout}
            />
            <hr className={styles.divider} />
          </>
        )}
        
        {currentView === 'dashboard' ? (
          <GetNotes 
            email={user?.email} 
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
          />
        ) : currentView === 'new-note' ? (
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
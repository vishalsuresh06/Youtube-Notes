import React, { useState } from 'react'
import { useFirebase } from '../../firebase/hook'
import UserHeader from './UserHeader'
import GetNotes from './GetNotes'
import NewNote from '../note/NewNote'
import ExistingNote from '../note/ExistingNote'
import type { Note } from '../../types'
import styles from './dashboard.module.css'

interface DashboardProps {
  onViewChange?: (view: 'dashboard' | 'new-note' | 'edit-note') => void
}

const Dashboard = ({ onViewChange }: DashboardProps) => {
  const { user, onLogout } = useFirebase()
  const [currentView, setCurrentView] = useState<'dashboard' | 'new-note' | 'edit-note'>('dashboard')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleAddNote = () => {
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
    </div>
  )
}

export default Dashboard
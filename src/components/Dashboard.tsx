import React from 'react'
import type { User } from 'firebase/auth'
import styles from '../styles/sidepanel.module.css'

interface DashboardProps {
  user: User
  onLogout: () => void
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1>Welcome to YouTube Notes</h1>
        <button 
          className={styles.button} 
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
      <div className={styles.userInfo}>
        <p>Welcome {user.displayName || 'User'}</p>
        <p>Your email is {user.email}</p>
      </div>
      <div className={styles.dashboardContent}>
        <p>Your notes and features will appear here.</p>
      </div>
    </div>
  )
}

export default Dashboard
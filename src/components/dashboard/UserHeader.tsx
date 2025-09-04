import React from 'react'
import styles from './dashboard.module.css'

interface UserHeaderProps {
  displayName: string | null
  email: string | null
  onLogout: () => void
}

const UserHeader = ({ displayName, email, onLogout }: UserHeaderProps) => {
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
        <p>Welcome {displayName || 'User'}</p>
        <p>Your email is {email}</p>
      </div>
    </div>
  )
}

export default UserHeader

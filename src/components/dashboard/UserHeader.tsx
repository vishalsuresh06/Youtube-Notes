import React from 'react'
import styles from './dashboard.module.css'

interface UserHeaderProps {
  displayName: string | null
  email: string | null
  onLogout: () => void
}

const UserHeader = ({ displayName, onLogout }: UserHeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.welcomeText}>{displayName || 'User'}</p>
      <button onClick={onLogout} className={styles.logoutButton}>
        Log out
      </button>
    </div>
  )
}

export default UserHeader

import React from 'react'
import { dashboardStyles as styles } from '../../styles'

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

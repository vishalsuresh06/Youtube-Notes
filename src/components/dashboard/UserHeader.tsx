import React from 'react'
import styles from './dashboard.module.css'

interface UserHeaderProps {
  displayName: string | null
  email: string | null
  onLogout: () => void
  onSwitchAccount?: () => void
}

const UserHeader = ({ displayName, onLogout, onSwitchAccount }: UserHeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.welcomeText}>{displayName || 'User'}</p>
      <div className={styles.buttonGroup}>
        {onSwitchAccount && (
          <button onClick={onSwitchAccount} className={styles.switchButton}>
            Switch Account
          </button>
        )}
        <button onClick={onLogout} className={styles.logoutButton}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserHeader

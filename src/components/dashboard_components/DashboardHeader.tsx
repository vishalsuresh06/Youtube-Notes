import React from 'react'
import { useFirebase } from '~firebase/hook'
import styles from './dashboard.module.css'

const DashboardHeader = () => {
  const { user, onLogout } = useFirebase()

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
        <p>Welcome {user?.displayName || 'User'}</p>
        <p>Your email is {user?.email}</p>
      </div>
      <div className={styles.dashboardContent}>
        <p>Your notes and features will appear here.</p>
      </div>
    </div>
  )
}

export default DashboardHeader
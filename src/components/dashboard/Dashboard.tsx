import React from 'react'
import { useFirebase } from '../../firebase/hook'
import styles from '../../styles/dashboard.module.css'
import UserHeader from './UserHeader'
import GetNotes from './GetNotes'

const Dashboard = () => {
  const { user, onLogout } = useFirebase()

  return (
    <div>
      <UserHeader 
        displayName={user?.displayName}
        email={user?.email}
        onLogout={onLogout}
      />

      <hr />
      
      <GetNotes email={user?.email} />
    </div>
  )
}

export default Dashboard
import React from 'react'
import { GetNotes } from './index'
import { dashboardStyles as styles } from '../../styles'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>        
        <GetNotes />
      </div>
    </div>
  )
}

export default Dashboard
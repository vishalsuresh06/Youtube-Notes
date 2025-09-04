import React from 'react'
import DashboardHeader from './dashboard_components/DashboardHeader'
import GetNotes from './dashboard_components/GetNotes'

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <GetNotes />
    </div>
  )
}

export default Dashboard
import React from 'react'

interface UserHeaderProps {
  displayName: string | null
  email: string | null
  onLogout: () => void
}

const UserHeader = ({ displayName, email, onLogout }: UserHeaderProps) => {
  return (
    <div>
      <div>
        <h1>Welcome to YouTube Notes</h1>
        <button onClick={onLogout}>
          Log out
        </button>
      </div>
      <div>
        <div>
          <p>Welcome back, {displayName || 'User'}</p>
        </div>
      </div>
    </div>
  )
}

export default UserHeader

import React from 'react'

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div>
      <div>🔐</div>
      <h2>Welcome to YouTube Notes</h2>
      <p>Please log in to access your personalized notes and features.</p>
      <div>
        <div>
          <span>📝</span>
          <span>Create and manage notes</span>
        </div>
        <div>
          <span>🎯</span>
          <span>Personalized experience</span>
        </div>
        <div>
          <span>💾</span>
          <span>Sync across devices</span>
        </div>
      </div>
      <button onClick={onLogin}>
        Log in with Google
      </button>
    </div>
  )
}

export default LoginPage
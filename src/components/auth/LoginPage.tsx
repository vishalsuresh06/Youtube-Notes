import React from 'react'
import { loginStyles as styles } from '../../styles'

interface LastUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface LoginPageProps {
  onLogin: () => void
  onLoginWithDifferentAccount: () => void
  lastUser: LastUser | null
  isLoading: boolean
}

const LoginPage = ({ onLogin, onLoginWithDifferentAccount, lastUser, isLoading }: LoginPageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome to YouTube Notes</h2>
        <p className={styles.subtitle}>Please log in to access your personalized notes and features.</p>
        
        {lastUser ? (
          <div className={styles.accountOptions}>
            <button className={styles.loginButton} onClick={onLogin} disabled={isLoading}>
              {lastUser.photoURL && (
                <img src={lastUser.photoURL} alt="Profile" className={styles.profileImage} />
              )}
              Continue as {lastUser.displayName || lastUser.email}
            </button>
            
            <hr className={styles.horizontalRule} />
            
            <button 
              className={styles.loginButtonOther} 
              onClick={onLoginWithDifferentAccount} 
              disabled={isLoading}
            >
              Sign in with Another Account
            </button>
          </div>
        ) : (
          <button className={styles.loginButton} onClick={onLogin} disabled={isLoading}>
            Log in with Google
          </button>
        )}
        
        {isLoading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
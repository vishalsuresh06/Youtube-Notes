import React, { useState, useEffect } from 'react'
import styles from './login.module.css'

interface LoginPageProps {
  onLoginCurrentUser: () => void
  onLoginDifferentAccount: () => void
  lastUserInfo: {email: string, name: string, photoURL?: string} | null
  isLoading: boolean
}

const LoginPage = ({ onLoginCurrentUser, onLoginDifferentAccount, lastUserInfo, isLoading }: LoginPageProps) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  // Reset image error when user info changes
  useEffect(() => {
    setImageError(false)
  }, [lastUserInfo?.photoURL])

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome to YouTube Notes</h2>
        <p className={styles.subtitle}>Please log in to access your personalized notes and features.</p>
        
        <div className={styles.loginOptions}>
          {lastUserInfo ? (
            <button 
              className={styles.currentUserButton} 
              onClick={onLoginCurrentUser} 
              disabled={isLoading}
            >
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {lastUserInfo.photoURL && !imageError ? (
                    <img 
                      src={lastUserInfo.photoURL} 
                      alt={lastUserInfo.name}
                      className={styles.profileImage}
                      onError={handleImageError}
                    />
                  ) : (
                    <span className={styles.avatarInitial}>
                      {lastUserInfo.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className={styles.userDetails}>
                  <div className={styles.userName}>{lastUserInfo.name}</div>
                  <div className={styles.userEmail}>{lastUserInfo.email}</div>
                </div>
              </div>
              <span className={styles.continueText}>Continue as {lastUserInfo.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button 
              className={styles.currentUserButton} 
              onClick={onLoginCurrentUser} 
              disabled={isLoading}
            >
              Sign in with Google
            </button>
          )}
          
          <button 
            className={styles.differentAccountButton} 
            onClick={onLoginDifferentAccount} 
            disabled={isLoading}
          >
            Use a different account
          </button>
        </div>
        
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
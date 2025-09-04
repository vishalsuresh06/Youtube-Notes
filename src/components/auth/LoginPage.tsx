import React from 'react'
import styles from './login.module.css'
interface LoginPageProps {
  onLogin: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome to YouTube Notes</h2>
        <p className={styles.subtitle}>Please log in to access your personalized notes and features.</p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📝</span>
            <span className={styles.featureText}>Create and manage notes</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎯</span>
            <span className={styles.featureText}>Personalized experience</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💾</span>
            <span className={styles.featureText}>Sync across devices</span>
          </div>
        </div>
        
        <button className={styles.loginButton} onClick={onLogin}>
          Log in with Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage
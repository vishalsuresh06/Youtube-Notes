import React from 'react'
import styles from '../../styles/sidepanel.module.css'

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className={styles.authPrompt}>
      <div className={styles.authIcon}>🔐</div>
      <h2>Welcome to YouTube Notes</h2>
      <p>Please log in to access your personalized notes and features.</p>
      <div className={styles.authBenefits}>
        <div className={styles.benefit}>
          <span className={styles.benefitIcon}>📝</span>
          <span>Create and manage notes</span>
        </div>
        <div className={styles.benefit}>
          <span className={styles.benefitIcon}>🎯</span>
          <span>Personalized experience</span>
        </div>
        <div className={styles.benefit}>
          <span className={styles.benefitIcon}>💾</span>
          <span>Sync across devices</span>
        </div>
      </div>
      <button 
        className={styles.button} 
        onClick={onLogin}
      >
        Log in with Google
      </button>
    </div>
  )
}

export default LoginPage
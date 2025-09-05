import React from 'react'
import { UI_CONSTANTS } from '../../constants'
import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 'medium' 
}: LoadingSpinnerProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default LoadingSpinner

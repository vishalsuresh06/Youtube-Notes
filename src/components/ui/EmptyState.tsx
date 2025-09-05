import React from 'react'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  message: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = ({
  title,
  message,
  icon,
  action
}: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}

export default EmptyState

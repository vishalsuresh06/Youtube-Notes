import React from "react"

import styles from "./login.module.css"

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome to YouTube Notes</h2>
        <p className={styles.subtitle}>
          Please log in to access your personalized notes and features.
        </p>

        <button className={styles.loginButton}>Log in with Google</button>
      </div>
    </div>
  )
}

export default LoginPage

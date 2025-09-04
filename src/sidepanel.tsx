import { useFirebase } from "~firebase/hook"
import styles from "./styles/sidepanel.module.css"

export default function IndexSidePanel() {
  const { user, isLoading, onLogin, onLogout } = useFirebase()

  const renderAuthButton = () => {
    if (!user) {
      return (
        <button 
          className={styles.button} 
          onClick={onLogin}
        >
          Log in
        </button>
      )
    }

    return (
      <button 
        className={styles.button} 
        onClick={onLogout}
      >
        Log out
      </button>
    )
  }

  const renderUserInfo = () => {
    if (isLoading) {
      return <span className={styles.loading}>Loading...</span>
    }

    if (!user) {
      return null
    }

    return (
      <div className={styles.welcome}>
        Welcome to Plasmo, {user.displayName}! 
        <br />
        Your email address is {user.email}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>
          Welcome to your{" "}
          <a href="https://www.plasmo.com" target="_blank" rel="noopener noreferrer">
            Plasmo
          </a>{" "}
          Extension!
        </h1>
      </header>

      <main className={styles.content}>
        {renderAuthButton()}
        {renderUserInfo()}
      </main>

      <footer className={styles.footer}>
        Crafted by @PlasmoHQ
      </footer>
    </div>
  )
}

import { useFirebase } from "./firebase/hook"
import styles from "./styles/sidepanel.module.css"
import { Dashboard, LoginPage } from "./components"

export default function IndexSidePanel() {
  const { user, isLoading, onLogin } = useFirebase()

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Checking authentication...</p>
        </div>
      )
    }

    if (!user)
      return <LoginPage onLogin={onLogin} />

    return <Dashboard />
  }

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>
          YouTube Notes
        </h1>
      </header>

      <main className={styles.content}>
        {renderMainContent()}
      </main>
    </div>
  )
}

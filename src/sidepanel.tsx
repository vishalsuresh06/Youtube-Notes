import { useState } from "react"
import { useFirebase } from "./firebase/hook"
import { Dashboard, LoginPage } from "./components"
import "./global.css"

export default function IndexSidePanel() {
  const { user, isLoading, onLogin } = useFirebase()
  const [currentView, setCurrentView] = useState<'dashboard' | 'new-note' | 'edit-note'>('dashboard')

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div>
          <p>Checking authentication...</p>
        </div>
      )
    }

    if (!user)
      return <LoginPage onLogin={onLogin} />

    return <Dashboard onViewChange={setCurrentView} />
  }

  return (
    <div>
      {currentView === 'dashboard' && (
        <header>
          <h1>
            YouTube Notes
          </h1>
        </header>
      )}

      <main>
        {renderMainContent()}
      </main>
    </div>
  )
}

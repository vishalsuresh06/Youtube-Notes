import { useState } from "react"
import { useFirebase } from "./firebase/hook"
import { Dashboard, LoginPage } from "./components"
import ErrorBoundary from "./components/ErrorBoundary"
import { VIEW_TYPES } from "./constants"
import type { ViewType } from "./types"
import "./global.module.css"

export default function IndexSidePanel() {
  const { user, isLoading, onLogin } = useFirebase()
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.DASHBOARD)

  return (
    <ErrorBoundary>
      {!user ? (
        <LoginPage onLogin={onLogin} isLoading={isLoading} />
      ) : (
        <Dashboard onViewChange={setCurrentView} />
      )}
    </ErrorBoundary>
  )
}

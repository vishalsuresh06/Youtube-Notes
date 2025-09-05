import { useState } from "react"
import { useFirebase } from "./firebase/hook"
import { Dashboard, LoginPage } from "./components"
import ErrorBoundary from "./components/ErrorBoundary"
import { VIEW_TYPES } from "./constants"
import type { ViewType } from "./types"
import "./global.module.css"

export default function IndexSidePanel() {
  const { user, isLoading, lastUserInfo, onLoginCurrentUser, onLoginDifferentAccount } = useFirebase()
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.DASHBOARD)

  return (
    <ErrorBoundary>
      {!user ? (
        <LoginPage 
          onLoginCurrentUser={onLoginCurrentUser}
          onLoginDifferentAccount={onLoginDifferentAccount}
          lastUserInfo={lastUserInfo}
          isLoading={isLoading} 
        />
      ) : (
        <Dashboard onViewChange={setCurrentView} />
      )}
    </ErrorBoundary>
  )
}

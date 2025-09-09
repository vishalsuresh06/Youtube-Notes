import { useState } from "react"
import { useFirebase } from "./firebase/hook"
import { Dashboard, LoginPage } from "./components"
import { globalStyles } from "./styles"

export default function IndexSidePanel() {
  const { user, isLoading, lastUser, onLogin, onLoginWithDifferentAccount } = useFirebase()
  const [currentView, setCurrentView] = useState<'dashboard' | 'new-note' | 'edit-note'>('dashboard')

  if (!user) 
    return (
      <LoginPage 
        onLogin={onLogin} 
        onLoginWithDifferentAccount={onLoginWithDifferentAccount}
        lastUser={lastUser}
        isLoading={isLoading} 
      />
    )
  return <Dashboard onViewChange={setCurrentView} />
}

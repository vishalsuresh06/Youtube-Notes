import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
} from "firebase/auth"
import type { User } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"

import { app, auth } from "./index"

const LAST_USER_KEY = 'youtube-notes-last-user'

const saveLastUser = (user: User) => {
  if (user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    localStorage.setItem(LAST_USER_KEY, JSON.stringify(userData))
  }
}

const getLastUser = () => {
  try {
    const userData = localStorage.getItem(LAST_USER_KEY)
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

setPersistence(auth, browserLocalPersistence)

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)
  const [lastUser, setLastUser] = useState(getLastUser())

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
    }
  }

  const onLogin = (forceNewAccount = false) => {
    setIsLoading(true)
    chrome.identity.getAuthToken({ 
      interactive: true,
      account: forceNewAccount ? undefined : lastUser?.email 
    }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error("Could not log in. ", e)
        }
      }
    })
  }

  const onLoginWithDifferentAccount = () => {
    chrome.identity.clearAllCachedAuthTokens(() => {
      onLogin(true)
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      if (user) {
        saveLastUser(user)
        setLastUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
  }, [])

  return {
    isLoading,
    user,
    lastUser,
    firestore,
    onLogin,
    onLoginWithDifferentAccount,
    onLogout
  }
}

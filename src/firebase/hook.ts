import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"
import type { User } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"

import { app, auth } from "./index"

setPersistence(auth, browserLocalPersistence)

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
      // Clear cached tokens to allow account selection on next login
      chrome.identity.clearAllCachedAuthTokens()
    }
  }

  const onSwitchAccount = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
      
      // Get current token and invalidate it
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        if (token) {
          chrome.identity.removeCachedAuthToken({ token }, () => {
            // Clear all tokens and revoke the token on Google's side
            chrome.identity.clearAllCachedAuthTokens(() => {
              // Revoke the token on Google's servers to force re-auth
              fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
                method: 'POST'
              }).then(() => {
                setTimeout(() => onLogin(true), 500)
              }).catch(() => {
                // Even if revoke fails, still try to login
                setTimeout(() => onLogin(true), 500)
              })
            })
          })
        } else {
          chrome.identity.clearAllCachedAuthTokens(() => {
            setTimeout(() => onLogin(true), 300)
          })
        }
      })
    }
  }

  const onLogin = (forceAccountPicker = false) => {
    setIsLoading(true)
    
    if (forceAccountPicker) {
      // For switch account, clear tokens and force account selection
      chrome.identity.clearAllCachedAuthTokens(() => {
        chrome.identity.getAuthToken({ interactive: true }, async function (token) {
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
      })
    } else {
      // Regular login - clear tokens first to force account selection
      chrome.identity.clearAllCachedAuthTokens(() => {
        chrome.identity.getAuthToken({ interactive: true }, async function (token) {
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
      })
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  return {
    isLoading,
    user,
    firestore,
    onLogin,
    onLogout,
    onSwitchAccount
  }
}

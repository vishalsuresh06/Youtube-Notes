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
  const [lastUserInfo, setLastUserInfo] = useState<{email: string, name: string, photoURL?: string} | null>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  // Functions to manage last user info in local storage
  const saveLastUserInfo = (userInfo: {email: string, name: string, photoURL?: string}) => {
    localStorage.setItem('youtube-notes-last-user', JSON.stringify(userInfo))
    setLastUserInfo(userInfo)
  }

  const loadLastUserInfo = () => {
    try {
      const saved = localStorage.getItem('youtube-notes-last-user')
      if (saved) {
        const userInfo = JSON.parse(saved)
        setLastUserInfo(userInfo)
      }
    } catch (error) {
      console.error('Failed to load last user info:', error)
      setLastUserInfo(null)
    }
  }

  const clearLastUserInfo = () => {
    localStorage.removeItem('youtube-notes-last-user')
    setLastUserInfo(null)
  }

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
      // Clear cached tokens to allow account selection on next login
      chrome.identity.clearAllCachedAuthTokens()
      // Keep lastUserInfo for next login, don't clear it
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
                setTimeout(() => {
                  chrome.identity.getAuthToken({ interactive: true }, async function (newToken) {
                    if (chrome.runtime.lastError || !newToken) {
                      console.error(chrome.runtime.lastError.message)
                      setIsLoading(false)
                      return
                    }
                    if (newToken) {
                      const credential = GoogleAuthProvider.credential(null, newToken)
                      try {
                        const result = await signInWithCredential(auth, credential)
                        if (result.user) {
                          saveLastUserInfo({
                            email: result.user.email || '',
                            name: result.user.displayName || '',
                            photoURL: result.user.photoURL || undefined
                          })
                        }
                      } catch (e) {
                        console.error("Could not log in. ", e)
                        setIsLoading(false)
                      }
                    }
                  })
                }, 500)
              }).catch(() => {
                // Even if revoke fails, still try to login
                setTimeout(() => {
                  chrome.identity.getAuthToken({ interactive: true }, async function (newToken) {
                    if (chrome.runtime.lastError || !newToken) {
                      console.error(chrome.runtime.lastError.message)
                      setIsLoading(false)
                      return
                    }
                    if (newToken) {
                      const credential = GoogleAuthProvider.credential(null, newToken)
                      try {
                        const result = await signInWithCredential(auth, credential)
                        if (result.user) {
                          saveLastUserInfo({
                            email: result.user.email || '',
                            name: result.user.displayName || '',
                            photoURL: result.user.photoURL || undefined
                          })
                        }
                      } catch (e) {
                        console.error("Could not log in. ", e)
                        setIsLoading(false)
                      }
                    }
                  })
                }, 500)
              })
            })
          })
        } else {
          chrome.identity.clearAllCachedAuthTokens(() => {
            setTimeout(() => {
              chrome.identity.getAuthToken({ interactive: true }, async function (token) {
                if (chrome.runtime.lastError || !token) {
                  console.error(chrome.runtime.lastError.message)
                  setIsLoading(false)
                  return
                }
                if (token) {
                  const credential = GoogleAuthProvider.credential(null, token)
                  try {
                    const result = await signInWithCredential(auth, credential)
                    if (result.user) {
                      saveLastUserInfo({
                        email: result.user.email || '',
                        name: result.user.displayName || '',
                        photoURL: result.user.photoURL || undefined
                      })
                    }
                  } catch (e) {
                    console.error("Could not log in. ", e)
                    setIsLoading(false)
                  }
                }
              })
            }, 300)
          })
        }
      })
    }
  }

  // Login with current/last user
  const onLoginCurrentUser = () => {
    setIsLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError.message)
        setIsLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          const result = await signInWithCredential(auth, credential)
          // Save user info as last user
          if (result.user) {
            saveLastUserInfo({
              email: result.user.email || '',
              name: result.user.displayName || '',
              photoURL: result.user.photoURL || undefined
            })
          }
        } catch (e) {
          console.error("Could not log in. ", e)
          setIsLoading(false)
        }
      }
    })
  }

  // Login with different account (force account picker)
  const onLoginDifferentAccount = () => {
    setIsLoading(true)
    
    // Get current token and revoke it to force account selection
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (token) {
        chrome.identity.removeCachedAuthToken({ token }, () => {
          chrome.identity.clearAllCachedAuthTokens(() => {
            // Revoke on Google's servers
            fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
              method: 'POST'
            }).then(() => {
              setTimeout(() => {
                chrome.identity.getAuthToken({ interactive: true }, async function (newToken) {
                  if (chrome.runtime.lastError || !newToken) {
                    console.error(chrome.runtime.lastError.message)
                    setIsLoading(false)
                    return
                  }
                  if (newToken) {
                    const credential = GoogleAuthProvider.credential(null, newToken)
                    try {
                      const result = await signInWithCredential(auth, credential)
                      // Save user info as last user
                      if (result.user) {
                        saveLastUserInfo({
                          email: result.user.email || '',
                          name: result.user.displayName || '',
                          photoURL: result.user.photoURL || undefined
                        })
                      }
                    } catch (e) {
                      console.error("Could not log in. ", e)
                      setIsLoading(false)
                    }
                  }
                })
              }, 500)
            }).catch(() => {
              // Even if revoke fails, still try to login with account picker
              setTimeout(() => {
                chrome.identity.getAuthToken({ interactive: true }, async function (newToken) {
                  if (chrome.runtime.lastError || !newToken) {
                    console.error(chrome.runtime.lastError.message)
                    setIsLoading(false)
                    return
                  }
                  if (newToken) {
                    const credential = GoogleAuthProvider.credential(null, newToken)
                    try {
                      const result = await signInWithCredential(auth, credential)
                      // Save user info as last user
                      if (result.user) {
                        saveLastUserInfo({
                          email: result.user.email || '',
                          name: result.user.displayName || '',
                          photoURL: result.user.photoURL || undefined
                        })
                      }
                    } catch (e) {
                      console.error("Could not log in. ", e)
                      setIsLoading(false)
                    }
                  }
                })
              }, 500)
            })
          })
        })
      } else {
        // No current token, just clear and login
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
                const result = await signInWithCredential(auth, credential)
                // Save user info as last user
                if (result.user) {
                  saveLastUserInfo({
                    email: result.user.email || '',
                    name: result.user.displayName || '',
                    photoURL: result.user.photoURL || undefined
                  })
                }
              } catch (e) {
                console.error("Could not log in. ", e)
                setIsLoading(false)
              }
            }
          })
        })
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      // If user signs in, save their info as last user
      if (user && user.email && user.displayName) {
        saveLastUserInfo({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL || undefined
        })
      }
    })
    
    // Load last user info on mount
    loadLastUserInfo()
  }, [])

  return {
    isLoading,
    user,
    firestore,
    lastUserInfo,
    clearLastUserInfo,
    onLoginCurrentUser,
    onLoginDifferentAccount,
    onLogout,
    onSwitchAccount
  }
}

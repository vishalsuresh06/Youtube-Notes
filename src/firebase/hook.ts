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

setPersistence(auth, browserLocalPersistence)

// OAuth configuration
const oauthClientId = process.env.PLASMO_PUBLIC_FIREBASE_CLIENT_ID // Replace with your actual client ID
const oauthClientScopes = ["openid", "email", "profile"]

interface LastUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)
  const [lastUser, setLastUser] = useState<LastUser | null>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  // Save user to storage
  const saveLastUser = (user: User) => {
    const lastUserData: LastUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    localStorage.setItem('lastUser', JSON.stringify(lastUserData))
    setLastUser(lastUserData)
  }

  // Load last user from storage
  const loadLastUser = () => {
    try {
      const savedUser = localStorage.getItem('lastUser')
      if (savedUser) {
        const lastUserData = JSON.parse(savedUser) as LastUser
        setLastUser(lastUserData)
      }
    } catch (error) {
      console.error('Error loading last user:', error)
    }
  }

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
    }
  }

const onLogin = async () => {
  setIsLoading(true)
  
  try {
    const credential = await getGoogleAuthCredential(false)
    await signInWithCredential(auth, credential)
  } catch (error) {
    console.error("Could not log in:", error)
    setIsLoading(false)
  }
}

const onLoginWithDifferentAccount = async () => {
  setIsLoading(true)
  
  try {
    const credential = await getGoogleAuthCredential(true)
    await signInWithCredential(auth, credential)
  } catch (error) {
    console.error("Could not log in with different account:", error)
    setIsLoading(false)
  }
}

const getGoogleAuthCredential = (forceAccountSelection: boolean = false) => {
  return new Promise<ReturnType<typeof GoogleAuthProvider.credential>>(
    (resolve, reject) => {
      const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;
      let authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${oauthClientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(oauthClientScopes.join(" "))}`;
      
      // Force account selection if requested
      if (forceAccountSelection) {
        authUrl += '&prompt=select_account';
      }

      chrome.identity.launchWebAuthFlow(
        { url: authUrl, interactive: true },
        (responseUrl) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
            return;
          }
          if (!responseUrl) {
            reject("No response URL returned");
            return;
          }
          const params = new URLSearchParams(
            new URL(responseUrl).hash.slice(1)
          );
          const token = params.get("access_token");

          if (!token) {
            reject("No token found in the response");
            return;
          }

          const credential = GoogleAuthProvider.credential(null, token);
          resolve(credential);
        }
      );
    }
  );
}


  useEffect(() => {
    // Load last user on initialization
    loadLastUser()
    
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      
      // Save user info when they successfully log in
      if (user) {
        saveLastUser(user)
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

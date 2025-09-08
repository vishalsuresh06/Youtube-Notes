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

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
    }
  }

const onLogin = async () => {
  setIsLoading(true)
  
  try {
    const credential = await getGoogleAuthCredential()
    await signInWithCredential(auth, credential)
  } catch (error) {
    console.error("Could not log in:", error)
    setIsLoading(false)
  }
}

const getGoogleAuthCredential = () => {
  return new Promise<ReturnType<typeof GoogleAuthProvider.credential>>(
    (resolve, reject) => {
      const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/`;
      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${oauthClientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(oauthClientScopes.join(" "))}`;

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
    onLogout
  }
}

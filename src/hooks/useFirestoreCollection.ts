import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore"
import type { DocumentData } from "firebase/firestore"
import { useCallback, useEffect, useMemo, useState } from "react"

import { useFirebase } from "../firebase/hook"

export const useFirestoreCollection = <T = any>(collectionPath: string) => {
  const { firestore, user } = useFirebase()
  const [data, _setData] = useState<T[]>([])
  const [isReady, setIsReady] = useState(false)

  const collectionRef = useMemo(() => {
    if (!firestore || !collectionPath || !user) {
      return null
    }

    const baseCollection = collection(firestore, collectionPath)
    return query(baseCollection, where("userId", "==", user.uid))
  }, [firestore, collectionPath, user])

  useEffect(() => {
    if (!collectionRef) {
      _setData([])
      return
    }

    async function init(_snapshot = null as QuerySnapshot<DocumentData>) {
      try {
        const snapshot = _snapshot || (await getDocs(collectionRef))
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as T[]
        _setData(documents)
        setIsReady(true)
      } catch (error) {
        // TODO: Beacon this
        console.error(error)
      }
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      init(snapshot)
    })

    return () => {
      unsubscribe()
    }
  }, [collectionRef])

  const updateData = useCallback(
    (docId: string, _data: Partial<T>) => {
      if (!firestore || !user) {
        return Promise.reject(new Error("User must be authenticated"))
      }

      const docRef = doc(firestore, collectionPath, docId)
      return updateDoc(docRef, _data as any)
    },
    [firestore, user, collectionPath]
  )

  const createData = useCallback(
    (_data: T) => {
      if (!firestore || !user) {
        return Promise.reject(new Error("User must be authenticated"))
      }

      const dataWithUser = {
        ..._data,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      return addDoc(collection(firestore, collectionPath), dataWithUser)
    },
    [firestore, user, collectionPath]
  )

  const saveData = useCallback(
    (noteId: string, _data: T) => {
      if (!firestore || !user) {
        return Promise.reject(new Error("User must be authenticated"))
      }

      const dataWithUser = {
        ..._data,
        userId: user.uid,
        updatedAt: serverTimestamp()
      }

      const docRef = doc(firestore, collectionPath, noteId)
      return setDoc(docRef, dataWithUser, { merge: true })
    },
    [firestore, user, collectionPath]
  )

  const deleteData = useCallback(
    (docId: string) => {
      if (!firestore || !user) {
        return Promise.reject(new Error("User must be authenticated"))
      }

      const docRef = doc(firestore, collectionPath, docId)
      return deleteDoc(docRef)
    },
    [firestore, user, collectionPath]
  )

  return {
    data,
    updateData,
    createData,
    saveData,
    deleteData,
    isReady
  }
}

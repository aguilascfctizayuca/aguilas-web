import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../firebase'

const PortalAuthContext = createContext(null)

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setError(null)

      if (!firebaseUser) {
        setUser(null)
        setUserData(null)
        setLoading(false)
        return
      }

      try {
        const email = firebaseUser.email.toLowerCase()
        const userDocRef = doc(db, 'usuarios', email)
        const userDocSnap = await getDoc(userDocRef)

        if (!userDocSnap.exists()) {
          setError('Tu cuenta de Google no está autorizada para entrar al portal. Contacta a Primera Mesa.')
          await signOut(auth)
          setUser(null)
          setUserData(null)
          setLoading(false)
          return
        }

        setUser(firebaseUser)
        setUserData({ id: userDocSnap.id, ...userDocSnap.data() })
      } catch (err) {
        console.error('Error verificando usuario:', err)
        setError('Hubo un error verificando tu cuenta. Intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const loginConGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error('Error en login:', err)
      setError('No se pudo iniciar sesión. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setUserData(null)
  }

  return (
    <PortalAuthContext.Provider value={{ user, userData, loading, error, loginConGoogle, logout }}>
      {children}
    </PortalAuthContext.Provider>
  )
}

export function usePortalAuth() {
  const context = useContext(PortalAuthContext)
  if (!context) {
    throw new Error('usePortalAuth debe usarse dentro de PortalAuthProvider')
  }
  return context
}
import { getAuth } from 'firebase/auth'

// Devuelve el token de sesión actual del usuario logueado, o null si no hay sesión.
export async function obtenerTokenAuth() {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null
  try {
    return await user.getIdToken()
  } catch (err) {
    console.warn('No se pudo obtener el token de autenticación:', err)
    return null
  }
}

// Helper para hacer fetch a nuestras rutas /api/* incluyendo el token automáticamente.
export async function fetchConAuth(url, options = {}) {
  const token = await obtenerTokenAuth()
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  return fetch(url, { ...options, headers })
}
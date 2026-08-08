import { adminAuth, adminDb } from './firebaseAdmin.js'

const ADMINS_TEMPORALES = ['schottalfredo@gmail.com']

// Verifica que la petición traiga un token válido de Firebase Auth (login real).
export async function verificarUsuario(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    return { email: decoded.email }
  } catch (err) {
    return null
  }
}

// Verifica que además esté registrado en la colección 'usuarios' del portal.
export async function verificarUsuarioRegistrado(req) {
  const usuario = await verificarUsuario(req)
  if (!usuario) return null
  const doc = await adminDb.collection('usuarios').doc(usuario.email).get()
  if (!doc.exists) return null
  return { email: usuario.email, ...doc.data() }
}

export function esDirectivoOPastoral(usuarioDoc, email) {
  if (usuarioDoc && ['pastor', 'administrativo', 'primera_mesa'].includes(usuarioDoc.rol)) return true
  return ADMINS_TEMPORALES.includes(email)
}

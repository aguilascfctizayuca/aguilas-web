import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export async function registrarActividad({ tipo, descripcion, usuarioEmail, usuarioNombre }) {
  try {
    await addDoc(collection(db, 'actividad_portal'), {
      tipo,
      descripcion,
      usuarioEmail,
      usuarioNombre,
      timestamp: serverTimestamp(),
    })
  } catch (err) {
    console.warn('No se pudo registrar la actividad:', err)
  }
}
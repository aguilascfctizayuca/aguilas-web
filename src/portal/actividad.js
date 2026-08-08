import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export async function registrarActividad({ tipo, descripcion, usuarioEmail, usuarioNombre, eventoId = null }) {
  try {
    await addDoc(collection(db, 'actividad_portal'), {
      tipo,
      descripcion,
      usuarioEmail,
      usuarioNombre,
      eventoId,
      timestamp: serverTimestamp(),
    })
  } catch (err) {
    console.warn('No se pudo registrar la actividad:', err)
  }
}

export async function obtenerActividadDeEvento(eventoId) {
  if (!eventoId) return []
  try {
    const q = query(
      collection(db, 'actividad_portal'),
      where('eventoId', '==', eventoId),
      orderBy('timestamp', 'desc')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (err) {
    console.warn('No se pudo cargar la actividad del evento:', err)
    return []
  }
}
import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export async function crearNotificacion({ ministerioId, eventoId, eventoTitulo, creadoPor }) {
  if (!ministerioId) return
  try {
    await addDoc(collection(db, 'notificaciones_portal'), {
      ministerioId,
      eventoId,
      eventoTitulo,
      texto: `Tu ministerio fue agregado al evento "${eventoTitulo}"`,
      creadoPor,
      leidoPor: [],
      createdAt: serverTimestamp(),
    })
  } catch (err) {
    console.warn('No se pudo crear la notificación:', err)
  }
}

export function escucharNotificaciones(ministerioId, callback) {
  if (!ministerioId) return () => {}
  const q = query(
    collection(db, 'notificaciones_portal'),
    where('ministerioId', '==', ministerioId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }, (err) => {
    console.warn('No se pudieron escuchar notificaciones:', err)
  })
}

export async function marcarComoLeida(notifId, email) {
  if (!email) return
  try {
    await updateDoc(doc(db, 'notificaciones_portal', notifId), {
      leidoPor: arrayUnion(email),
    })
  } catch (err) {
    console.warn('No se pudo marcar como leída:', err)
  }
}

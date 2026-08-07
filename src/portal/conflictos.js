import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function seSuperponen(inicioA, finA, inicioB, finB) {
  const a1 = inicioA
  const a2 = finA || inicioA
  const b1 = inicioB
  const b2 = finB || inicioB
  return a1 < b2 && b1 < a2
}

export async function buscarConflictos({ fecha, horaInicio, horaFin, ubicacion, idEventoActual }) {
  if (!fecha || !horaInicio || !ubicacion || !ubicacion.trim()) return []

  const q = query(collection(db, 'eventos_internos'), where('fecha', '==', fecha))
  const snap = await getDocs(q)

  const ubicacionNormalizada = ubicacion.trim().toLowerCase()

  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((ev) => {
      if (ev.id === idEventoActual) return false
      if (!ev.ubicacion || ev.ubicacion.trim().toLowerCase() !== ubicacionNormalizada) return false
      return seSuperponen(horaInicio, horaFin, ev.horaInicio, ev.horaFin)
    })
}
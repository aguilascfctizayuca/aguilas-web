import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import './portal.css'
export default function ActividadReciente() {
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(true)
  useEffect(() => {
    async function cargar() {
      try {
        const q = query(collection(db, 'actividad_portal'), orderBy('timestamp', 'desc'), limit(15))
        const snap = await getDocs(q)
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.warn('No se pudo cargar la actividad reciente:', err)
      }
      setCargando(false)
    }
    cargar()
  }, [])
  if (cargando) return null
  if (items.length === 0) return null
  return (
    <div style={styles.box}>
      <h3 style={styles.titulo}>Actividad reciente</h3>
      <div style={styles.scrollArea} className="portal-scroll-fino">
        {items.map((item) => (
          <div key={item.id} style={styles.item}>
            <span style={styles.punto} />
            <p style={styles.texto}>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
const styles = {
  box: {
    padding: '16px 20px', borderRadius: '14px', background: 'var(--portal-card-bg)',
    border: '1px solid var(--portal-card-border)', marginBottom: '24px',
  },
  titulo: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '15px', color: 'var(--portal-text)', margin: '0 0 10px' },
  scrollArea: {
    display: 'flex', flexDirection: 'column', gap: '10px',
    maxHeight: '160px', overflowY: 'auto', paddingRight: '6px',
  },
  item: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
  punto: { width: '6px', height: '6px', borderRadius: '50%', background: '#3DDC04', marginTop: '6px', flexShrink: 0 },
  texto: { margin: 0, fontSize: '13px', color: 'var(--portal-muted)', lineHeight: '1.4' },
}
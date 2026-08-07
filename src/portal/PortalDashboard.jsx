import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { usePortalAuth } from './PortalAuthContext'
import './portal.css'

export default function PortalDashboard() {
  const { userData, logout } = usePortalAuth()
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarEventos() {
      const hoy = new Date().toISOString().split('T')[0]
      const q = query(collection(db, 'eventos_internos'), orderBy('fecha', 'asc'))
      const snap = await getDocs(q)
      const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      const proximos = todos.filter((e) => e.fecha >= hoy).slice(0, 8)
      setEventos(proximos)
      setCargando(false)
    }
    cargarEventos()
  }, [])

  return (
    <div style={styles.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={styles.h1}>
            Hola, {userData?.nombre?.split(' ')[0] || 'líder'}
          </h1>
          <p style={styles.subtitle}>
            {userData?.rol === 'pastor' && 'Pastor'}
            {userData?.rol === 'primera_mesa' && 'Primera Mesa'}
            {userData?.rol === 'lider' && `Líder de ${userData?.ministerio || 'ministerio'}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/lideres/eventos/nuevo" style={styles.buttonPrimary}>+ Nuevo evento</Link>
          <button onClick={logout} style={styles.buttonSecondary}>Cerrar sesión</button>
        </div>
      </div>

      <h2 style={styles.h2}>Próximos eventos</h2>

      {cargando && <p style={styles.muted}>Cargando...</p>}
      {!cargando && eventos.length === 0 && <p style={styles.muted}>No hay eventos próximos registrados.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
        {eventos.map((ev) => (
          <div key={ev.id} style={styles.card}>
            <div>
              <strong style={styles.cardTitle}>{ev.titulo}</strong>
              <p style={styles.cardMeta}>
                {ev.fecha} · {ev.horaInicio}{ev.horaFin ? ` - ${ev.horaFin}` : ''}
                {ev.ubicacion ? ` · ${ev.ubicacion}` : ''}
              </p>
            </div>
            <span style={styles.badge}>{ev.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
    padding: '32px',
    background: 'var(--portal-bg)',
    color: 'var(--portal-text)',
  },
  h1: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, margin: 0, color: 'var(--portal-text)' },
  h2: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '18px', color: 'var(--portal-text)' },
  subtitle: { color: 'var(--portal-muted)', margin: '4px 0 0' },
  muted: { color: 'var(--portal-muted-2)' },
  buttonPrimary: {
    padding: '10px 18px', borderRadius: '8px', background: '#3DDC04', color: '#0F0F12',
    fontWeight: 700, textDecoration: 'none', fontSize: '14px',
  },
  buttonSecondary: {
    padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--portal-button-secondary-border)',
    background: 'var(--portal-button-secondary-bg)', color: 'var(--portal-text)', cursor: 'pointer', fontSize: '14px',
  },
  card: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderRadius: '10px',
    border: '1px solid var(--portal-card-border)', background: 'var(--portal-card-bg)',
  },
  cardTitle: { color: 'var(--portal-text)' },
  cardMeta: { margin: '4px 0 0', color: 'var(--portal-muted)', fontSize: '14px' },
  badge: {
    fontSize: '12px', fontWeight: 600, textTransform: 'capitalize',
    padding: '4px 10px', borderRadius: '20px', background: 'var(--portal-badge-bg)', color: 'var(--portal-badge-text)',
  },
}
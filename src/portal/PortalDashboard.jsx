import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { usePortalAuth } from './PortalAuthContext'
import PortalCalendario from './PortalCalendario'
import AvisosBanner from './AvisosBanner'
import ActividadReciente from './ActividadReciente'
import './portal.css'

export default function PortalDashboard() {
  const navigate = useNavigate()
  const { userData, user, logout } = usePortalAuth()
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarEventos() {
      const q = query(collection(db, 'eventos_internos'), orderBy('fecha', 'asc'))
      const snap = await getDocs(q)
      const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setEventos(todos)
      setCargando(false)
    }
    cargarEventos()
  }, [])

  const hoyStr = new Date().toISOString().split('T')[0]
  const primerDiaMes = hoyStr.slice(0, 7)

  const proximosEventos = useMemo(
    () => eventos.filter((e) => e.fecha >= hoyStr).slice(0, 6),
    [eventos, hoyStr]
  )

  const eventosEsteMes = useMemo(
    () => eventos.filter((e) => e.fecha && e.fecha.startsWith(primerDiaMes)).length,
    [eventos, primerDiaMes]
  )

  const ADMINS_TEMPORALES = ['schottalfredo@gmail.com']
    const puedeVerAgendaPastoral = userData?.rol === 'pastor' || ADMINS_TEMPORALES.includes(user?.email)

  return (
    <div className="portal-dashboard-page" style={styles.page}>
      <div className="portal-fade-in portal-dashboard-header" style={styles.header}>
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
        <div className="portal-dashboard-actions" style={{ display: 'flex', gap: '12px' }}>
          {puedeVerAgendaPastoral && (
            <Link to="/lideres/agenda-pastoral" style={styles.buttonSecondary}>
              Agenda Pastoral
            </Link>
          )}
          <Link to="/lideres/eventos/nuevo" className="portal-button-primary" style={styles.buttonPrimary}>
            + Nuevo evento
          </Link>
          <button onClick={logout} style={styles.buttonSecondary}>Cerrar sesión</button>
        </div>
      </div>

      <div className="portal-fade-in" style={{ animationDelay: '0.04s' }}>
        <AvisosBanner />
      </div>

      <div className="portal-fade-in portal-dashboard-stats" style={{ ...styles.statsRow, animationDelay: '0.06s' }}>
        <div className="portal-stat-card" style={styles.statCard}>
          <span style={styles.statNumber}>{proximosEventos.length}</span>
          <span style={styles.statLabel}>Próximos eventos</span>
        </div>
        <div className="portal-stat-card" style={styles.statCard}>
          <span style={styles.statNumber}>{eventosEsteMes}</span>
          <span style={styles.statLabel}>Eventos este mes</span>
        </div>
      </div>

      <div className="portal-fade-in" style={{ ...styles.calendarioBox, animationDelay: '0.12s' }}>
        <PortalCalendario embedded />
      </div>

      <h2 className="portal-fade-in" style={{ ...styles.h2, animationDelay: '0.18s' }}>
        Próximos eventos
      </h2>

      {cargando && <p style={styles.muted}>Cargando...</p>}
      {!cargando && proximosEventos.length === 0 && (
        <p style={styles.muted}>No hay eventos próximos registrados.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {proximosEventos.map((ev, i) => (
          <div
            key={ev.id}
            className="portal-hover-card portal-fade-in"
            onClick={() => navigate(`/lideres/eventos/${ev.id}/editar`)}
            style={{ ...styles.card, animationDelay: `${0.22 + i * 0.05}s` }}
          >
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

      <ActividadReciente />
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
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' },
  h1: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, margin: 0, color: 'var(--portal-text)' },
  h2: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '18px', color: 'var(--portal-text)', margin: '0 0 12px' },
  subtitle: { color: 'var(--portal-muted)', margin: '4px 0 0' },
  muted: { color: 'var(--portal-muted-2)' },
  statsRow: { display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' },
  statCard: {
    flex: '1 1 180px', padding: '18px 20px', borderRadius: '12px',
    background: 'var(--portal-card-bg)', border: '1px solid var(--portal-card-border)',
    display: 'flex', flexDirection: 'column', gap: '4px',
  },
  statNumber: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '32px', color: '#3DDC04' },
  statLabel: { fontSize: '13px', color: 'var(--portal-muted)' },
  calendarioBox: {
    padding: '20px', borderRadius: '14px', background: 'var(--portal-card-bg)',
    border: '1px solid var(--portal-card-border)', marginBottom: '28px',
  },
  buttonPrimary: {
    padding: '10px 18px', borderRadius: '8px', background: '#3DDC04', color: '#0F0F12',
    fontWeight: 700, textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap',
  },
  buttonSecondary: {
    padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--portal-button-secondary-border)',
    background: 'var(--portal-button-secondary-bg)', color: 'var(--portal-text)', cursor: 'pointer', fontSize: '14px',
    whiteSpace: 'nowrap', textDecoration: 'none',
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
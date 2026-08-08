import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortalAuth } from './PortalAuthContext'
import { fetchConAuth } from './authFetch'
import './portal.css'

// Correos con acceso especial mientras no hay más de un administrador definido.
const ADMINS_TEMPORALES = ['schottalfredo@gmail.com']

export default function AgendaPastoral() {
  const { userData, user } = usePortalAuth()
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const tieneAcceso =
    ['pastor', 'administrativo', 'primera_mesa'].includes(userData?.rol) ||
    ADMINS_TEMPORALES.includes(user?.email)

  useEffect(() => {
    if (!tieneAcceso) return
    async function cargar() {
      try {
        const respuesta = await fetchConAuth('/api/eventos-pastorales')
        if (respuesta.ok) {
          const data = await respuesta.json()
          setEventos(data.eventos || [])
        } else {
          setError('No se pudo cargar la agenda pastoral.')
        }
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la agenda pastoral.')
      }
      setCargando(false)
    }
    cargar()
  }, [tieneAcceso])

  if (!tieneAcceso) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <Link to="/lideres/dashboard" style={styles.backLink}>← Volver al dashboard</Link>
          <p style={styles.sinAcceso}>Esta sección es solo para Pastor.</p>
        </div>
      </div>
    )
  }

  function formatearFecha(fechaISO) {
    if (!fechaISO) return ''
    const fecha = new Date(fechaISO)
    if (isNaN(fecha)) return fechaISO
    return fecha.toLocaleDateString('es-MX', {
      weekday: 'long', day: 'numeric', month: 'long',
      hour: fechaISO.includes('T') ? '2-digit' : undefined,
      minute: fechaISO.includes('T') ? '2-digit' : undefined,
    })
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/lideres/dashboard" style={styles.backLink}>← Volver al dashboard</Link>
        <h1 style={styles.title}>Agenda Pastoral</h1>
        <p style={styles.subtitle}>Visible solo para Pastor.</p>

        {error && <p style={styles.error}>{error}</p>}
        {cargando && <p style={{ color: 'var(--portal-muted-2)' }}>Cargando...</p>}
        {!cargando && !error && eventos.length === 0 && (
          <p style={{ color: 'var(--portal-muted-2)' }}>No hay eventos próximos en la agenda pastoral.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={styles.card}>
              <strong style={styles.cardTitle}>{ev.titulo}</strong>
              <p style={styles.cardMeta}>
                {formatearFecha(ev.inicio)}
                {ev.ubicacion ? ` · ${ev.ubicacion}` : ''}
              </p>
              {ev.descripcion && <p style={styles.cardDescripcion}>{ev.descripcion}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--portal-bg)', padding: '32px 20px' },
  container: { maxWidth: '640px', margin: '0 auto', fontFamily: 'Inter, sans-serif' },
  backLink: { color: 'var(--portal-muted)', fontSize: '14px', textDecoration: 'none' },
  title: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, margin: '12px 0 4px', color: 'var(--portal-text)' },
  subtitle: { color: 'var(--portal-muted)', fontSize: '14px', marginBottom: '20px' },
  error: { color: 'var(--portal-error-text)', background: 'var(--portal-error-bg)', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  sinAcceso: { color: 'var(--portal-muted)', marginTop: '20px' },
  card: {
    padding: '14px 16px', borderRadius: '10px',
    border: '1px solid var(--portal-card-border)', background: 'var(--portal-card-bg)',
  },
  cardTitle: { color: 'var(--portal-text)' },
  cardMeta: { margin: '4px 0 0', color: 'var(--portal-muted)', fontSize: '14px', textTransform: 'capitalize' },
  cardDescripcion: { margin: '8px 0 0', color: 'var(--portal-muted)', fontSize: '13px' },
}
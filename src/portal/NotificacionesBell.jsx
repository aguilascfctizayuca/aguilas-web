import { useEffect, useState, useRef } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePortalAuth } from './PortalAuthContext'
import { escucharNotificaciones, marcarComoLeida } from './notificaciones'
import './portal.css'

export default function NotificacionesBell() {
  const { userData, user } = usePortalAuth()
  const navigate = useNavigate()
  const [notificaciones, setNotificaciones] = useState([])
  const [abierto, setAbierto] = useState(false)
  const cajaRef = useRef(null)

  const ministerioId = userData?.rol === 'lider' ? userData?.ministerio : null

  useEffect(() => {
    if (!ministerioId) return
    const unsub = escucharNotificaciones(ministerioId, setNotificaciones)
    return unsub
  }, [ministerioId])

  useEffect(() => {
    function clickFuera(e) {
      if (cajaRef.current && !cajaRef.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('mousedown', clickFuera)
    return () => document.removeEventListener('mousedown', clickFuera)
  }, [])

  if (!ministerioId) return null

  const noLeidas = notificaciones.filter((n) => !n.leidoPor?.includes(user?.email))

  function abrirNotificacion(n) {
    if (!n.leidoPor?.includes(user?.email)) marcarComoLeida(n.id, user?.email)
    setAbierto(false)
    if (n.eventoId) navigate(`/lideres/eventos/${n.eventoId}/editar`)
  }

  return (
    <div ref={cajaRef} style={{ position: 'relative' }}>
      <button onClick={() => setAbierto((v) => !v)} style={styles.botonCampana} aria-label="Notificaciones">
        <Bell size={19} strokeWidth={2.1} />
        {noLeidas.length > 0 && <span style={styles.badgeContador}>{noLeidas.length > 9 ? '9+' : noLeidas.length}</span>}
      </button>

      {abierto && (
        <div className="portal-fade-in" style={styles.dropdown}>
          <div style={styles.dropdownHeader}>Notificaciones</div>
          {notificaciones.length === 0 && (
            <p style={styles.vacio}>No tienes notificaciones todavía.</p>
          )}
          <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {notificaciones.slice(0, 15).map((n) => {
              const noLeida = !n.leidoPor?.includes(user?.email)
              return (
                <button
                  key={n.id}
                  onClick={() => abrirNotificacion(n)}
                  style={{ ...styles.item, background: noLeida ? 'var(--portal-badge-bg)' : 'transparent' }}
                >
                  {noLeida && <span style={styles.puntoNoLeido} />}
                  <span style={{ flex: 1, textAlign: 'left' }}>{n.texto}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  botonCampana: {
    position: 'relative', width: '38px', height: '38px', borderRadius: '8px',
    border: '1px solid var(--portal-button-secondary-border)', background: 'var(--portal-button-secondary-bg)',
    color: 'var(--portal-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  badgeContador: {
    position: 'absolute', top: '-5px', right: '-5px', background: '#FF3B3B', color: '#fff',
    fontSize: '10px', fontWeight: 700, borderRadius: '10px', minWidth: '16px', height: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
  },
  dropdown: {
    position: 'absolute', top: '46px', right: 0, width: '300px', maxWidth: '90vw',
    background: 'var(--portal-card-bg)', border: '1px solid var(--portal-card-border)',
    borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 9999, overflow: 'hidden',
  },
  dropdownHeader: {
    padding: '12px 14px', fontWeight: 700, fontSize: '13px', color: 'var(--portal-text)',
    borderBottom: '1px solid var(--portal-card-border)',
  },
  vacio: { padding: '16px 14px', fontSize: '13px', color: 'var(--portal-muted-2)', margin: 0 },
  item: {
    display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '11px 14px',
    border: 'none', borderBottom: '1px solid var(--portal-card-border)', cursor: 'pointer',
    fontSize: '13px', color: 'var(--portal-text)', fontFamily: 'Inter, sans-serif',
  },
  puntoNoLeido: { width: '7px', height: '7px', borderRadius: '50%', background: '#3DDC04', flexShrink: 0 },
}
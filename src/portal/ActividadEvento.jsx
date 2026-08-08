import { useEffect, useState } from 'react'
import { obtenerActividadDeEvento } from './actividad'
import './portal.css'

const ICONO_TIPO = {
  crear: '✨',
  editar: '✏️',
  eliminar: '🗑️',
}

function formatearFecha(timestamp) {
  if (!timestamp?.toDate) return ''
  const fecha = timestamp.toDate()
  return fecha.toLocaleString('es-MX', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

export default function ActividadEvento({ eventoId }) {
  const [actividad, setActividad] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const lista = await obtenerActividadDeEvento(eventoId)
      setActividad(lista)
      setCargando(false)
    }
    if (eventoId) cargar()
  }, [eventoId])

  if (cargando || actividad.length === 0) return null

  return (
    <div style={styles.contenedor}>
      <h3 style={styles.titulo}>Actividad de este evento</h3>
      <div style={styles.lista}>
        {actividad.map((a) => (
          <div key={a.id} style={styles.item}>
            <span style={styles.icono}>{ICONO_TIPO[a.tipo] || '•'}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={styles.descripcion}>{a.descripcion}</p>
              <span style={styles.fecha}>{formatearFecha(a.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  contenedor: {
    marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--portal-card-border)',
  },
  titulo: {
    fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '14px',
    color: 'var(--portal-text)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.4px',
  },
  lista: { display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' },
  item: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
  icono: { fontSize: '15px', flexShrink: 0, marginTop: '1px' },
  descripcion: { margin: 0, fontSize: '13px', color: 'var(--portal-text)' },
  fecha: { fontSize: '11px', color: 'var(--portal-muted-2)' },
}
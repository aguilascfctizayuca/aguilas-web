import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import './portal.css'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function PortalCalendario({ embedded = false }) {
  const navigate = useNavigate()
  const hoy = new Date()
  const [mesActual, setMesActual] = useState(hoy.getMonth())
  const [anioActual, setAnioActual] = useState(hoy.getFullYear())
  const [eventos, setEventos] = useState([])
  const [ministerios, setMinisterios] = useState({})
  const [cargando, setCargando] = useState(true)
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)

  useEffect(() => {
    async function cargar() {
      setCargando(true)
      const [eventosSnap, ministeriosSnap] = await Promise.all([
        getDocs(collection(db, 'eventos_internos')),
        getDocs(collection(db, 'ministerios')),
      ])

      const mapaMinisterios = {}
      ministeriosSnap.docs.forEach((d) => {
        mapaMinisterios[d.id] = d.data()
      })
      setMinisterios(mapaMinisterios)

      const todos = eventosSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setEventos(todos)
      setCargando(false)
    }
    cargar()
  }, [])

  const eventosPorDia = useMemo(() => {
    const mapa = {}
    eventos.forEach((ev) => {
      if (!ev.fecha) return
      if (!mapa[ev.fecha]) mapa[ev.fecha] = []
      mapa[ev.fecha].push(ev)
    })
    return mapa
  }, [eventos])

  const diasDelMes = useMemo(() => {
    const primerDia = new Date(anioActual, mesActual, 1)
    const ultimoDia = new Date(anioActual, mesActual + 1, 0)
    const diasVacios = primerDia.getDay()
    const totalDias = ultimoDia.getDate()

    const celdas = []
    for (let i = 0; i < diasVacios; i++) celdas.push(null)
    for (let d = 1; d <= totalDias; d++) celdas.push(d)
    return celdas
  }, [mesActual, anioActual])

  function formatoFecha(dia) {
    const mm = String(mesActual + 1).padStart(2, '0')
    const dd = String(dia).padStart(2, '0')
    return `${anioActual}-${mm}-${dd}`
  }

  function cambiarMes(delta) {
    let nuevoMes = mesActual + delta
    let nuevoAnio = anioActual
    if (nuevoMes < 0) { nuevoMes = 11; nuevoAnio -= 1 }
    if (nuevoMes > 11) { nuevoMes = 0; nuevoAnio += 1 }
    setMesActual(nuevoMes)
    setAnioActual(nuevoAnio)
    setDiaSeleccionado(null)
  }

  const esHoy = (dia) =>
    dia === hoy.getDate() && mesActual === hoy.getMonth() && anioActual === hoy.getFullYear()

  const eventosDelDiaSeleccionado = diaSeleccionado
    ? (eventosPorDia[formatoFecha(diaSeleccionado)] || [])
    : []

  const contenido = (
    <>
      <div style={styles.navMes}>
        <button onClick={() => cambiarMes(-1)} style={styles.navButton}>‹</button>
        <h2 style={styles.mesTitulo}>{MESES[mesActual]} {anioActual}</h2>
        <button onClick={() => cambiarMes(1)} style={styles.navButton}>›</button>
      </div>

      {cargando ? (
        <p style={{ color: 'var(--portal-muted-2)' }}>Cargando...</p>
      ) : (
        <>
          <div style={styles.grid}>
            {DIAS.map((d) => (
              <div key={d} style={styles.diaHeader}>{d}</div>
            ))}
            {diasDelMes.map((dia, idx) => {
              if (dia === null) return <div key={`vacio-${idx}`} style={styles.celdaVacia} />
              const fecha = formatoFecha(dia)
              const eventosDia = eventosPorDia[fecha] || []
              return (
                <div
                  key={dia}
                  className="portal-day-cell"
                  onClick={() => setDiaSeleccionado(dia)}
                  style={{
                    ...styles.celda,
                    ...(esHoy(dia) ? styles.celdaHoy : {}),
                    ...(diaSeleccionado === dia ? styles.celdaSeleccionada : {}),
                  }}
                >
                  <span style={styles.numeroDia}>{dia}</span>
                  <div style={styles.puntosContainer}>
                    {eventosDia.slice(0, 3).map((ev, i) => (
                      <span
                        key={i}
                        style={{
                          ...styles.punto,
                          background: ministerios[ev.ministerioOrganizador]?.color || '#999',
                        }}
                      />
                    ))}
                    {eventosDia.length > 3 && (
                      <span style={styles.masEventos}>+{eventosDia.length - 3}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {diaSeleccionado && (
            <div style={styles.panelDia}>
              <h3 style={styles.panelTitulo}>
                {diaSeleccionado} de {MESES[mesActual]}
              </h3>
              {eventosDelDiaSeleccionado.length === 0 ? (
                <p style={{ color: 'var(--portal-muted-2)' }}>No hay eventos este día.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {eventosDelDiaSeleccionado.map((ev) => (
                    <div
                      key={ev.id}
                      className="portal-hover-card"
                      onClick={() => navigate(`/lideres/eventos/${ev.id}/editar`)}
                      style={styles.eventoCard}
                    >
                      <span
                        style={{
                          ...styles.colorBar,
                          background: ministerios[ev.ministerioOrganizador]?.color || '#999',
                        }}
                      />
                      <div>
                        <strong style={{ color: 'var(--portal-text)' }}>{ev.titulo}</strong>
                        <p style={styles.eventoMeta}>
                          {ev.horaInicio}{ev.horaFin ? ` - ${ev.horaFin}` : ''}
                          {ev.ubicacion ? ` · ${ev.ubicacion}` : ''}
                          {ministerios[ev.ministerioOrganizador]?.nombre
                            ? ` · ${ministerios[ev.ministerioOrganizador].nombre}`
                            : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  )

  if (embedded) {
    return <div>{contenido}</div>
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.h1}>Calendario</h1>
          <Link to="/lideres/dashboard" style={styles.backLink}>← Volver al dashboard</Link>
        </div>
        <Link to="/lideres/eventos/nuevo" style={styles.buttonPrimary}>+ Nuevo evento</Link>
      </div>
      {contenido}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--portal-bg)', padding: '32px', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  h1: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, margin: 0, color: 'var(--portal-text)' },
  backLink: { color: 'var(--portal-muted)', fontSize: '14px', textDecoration: 'none' },
  buttonPrimary: {
    padding: '10px 18px', borderRadius: '8px', background: '#3DDC04', color: '#0F0F12',
    fontWeight: 700, textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap',
  },
  navMes: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' },
  navButton: {
    width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--portal-card-border)',
    background: 'var(--portal-card-bg)', color: 'var(--portal-text)', fontSize: '18px', cursor: 'pointer',
  },
  mesTitulo: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: 'var(--portal-text)', margin: 0, minWidth: '200px', textAlign: 'center' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px',
    maxWidth: '840px', margin: '0 auto',
  },
  diaHeader: { textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--portal-muted)', padding: '6px 0' },
  celdaVacia: { minHeight: '70px' },
  celda: {
    minHeight: '70px', borderRadius: '8px', border: '1px solid var(--portal-card-border)',
    background: 'var(--portal-card-bg)', padding: '6px', cursor: 'pointer', display: 'flex',
    flexDirection: 'column', gap: '4px',
  },
  celdaHoy: { border: '2px solid #3DDC04' },
  celdaSeleccionada: { outline: '2px solid var(--portal-text)', outlineOffset: '-2px' },
  numeroDia: { fontSize: '13px', fontWeight: 600, color: 'var(--portal-text)' },
  puntosContainer: { display: 'flex', gap: '3px', flexWrap: 'wrap', alignItems: 'center' },
  punto: { width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' },
  masEventos: { fontSize: '10px', color: 'var(--portal-muted)' },
  panelDia: {
    maxWidth: '840px', margin: '24px auto 0', padding: '16px',
    background: 'var(--portal-card-bg)', border: '1px solid var(--portal-card-border)', borderRadius: '10px',
  },
  panelTitulo: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: 'var(--portal-text)', margin: '0 0 12px' },
  eventoCard: {
    display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px',
    background: 'var(--portal-bg)', border: '1px solid transparent',
  },
  colorBar: { width: '4px', borderRadius: '2px', flexShrink: 0 },
  eventoMeta: { margin: '2px 0 0', fontSize: '13px', color: 'var(--portal-muted)' },
}
import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

// day: 0=domingo ... 6=sábado
const HORARIOS = [
  { dia: 'Domingo', diaSemana: 0, hora: 9, minuto: 45, label: 'Domingo 9:45 AM' },
  { dia: 'Domingo', diaSemana: 0, hora: 11, minuto: 45, label: 'Domingo 11:45 AM' },
  { dia: 'Miércoles', diaSemana: 3, hora: 19, minuto: 0, label: 'Miércoles 7:00 PM' },
  { dia: 'Lunes', diaSemana: 1, hora: 19, minuto: 30, label: 'Lunes 7:30 PM (Tabernáculo)' },
]

function proximoServicio() {
  const ahora = new Date()
  let mejor = null
  for (const h of HORARIOS) {
    const fecha = new Date(ahora)
    const delta = (h.diaSemana - ahora.getDay() + 7) % 7
    fecha.setDate(ahora.getDate() + delta)
    fecha.setHours(h.hora, h.minuto, 0, 0)
    if (fecha <= ahora) fecha.setDate(fecha.getDate() + 7)
    if (!mejor || fecha < mejor.fecha) mejor = { ...h, fecha }
  }
  return mejor
}

function useProximoServicio() {
  const [proximo, setProximo] = useState(proximoServicio)
  const [restante, setRestante] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date()
      let diff = proximo.fecha - ahora
      if (diff <= 0) {
        const nuevo = proximoServicio()
        setProximo(nuevo)
        diff = nuevo.fecha - ahora
      }
      setRestante(diff)
    }, 1000)
    return () => clearInterval(interval)
  }, [proximo])

  return { proximo, restante }
}

function formatearRestante(ms) {
  const totalSeg = Math.max(0, Math.floor(ms / 1000))
  const dias = Math.floor(totalSeg / 86400)
  const horas = Math.floor((totalSeg % 86400) / 3600)
  const minutos = Math.floor((totalSeg % 3600) / 60)
  const segundos = totalSeg % 60
  const pad = (n) => String(n).padStart(2, '0')
  if (dias > 0) return `${dias}d ${pad(horas)}h ${pad(minutos)}m`
  return `${pad(horas)}h ${pad(minutos)}m ${pad(segundos)}s`
}

function CardServicio({ dia, subtitulo, horarios, activo, esHoy }) {
  return (
    <div
      className="card-servicio"
      style={{
        flex: '1 1 220px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        cursor: 'default',
        borderRadius: '12px',
        border: '1.5px solid var(--verde)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: activo ? '0 0 24px rgba(61,220,4,0.2)' : '0 0 0px rgba(61,220,4,0)',
      }}
    >
      {activo && (
        <span className="card-servicio__badge" style={{
          position: 'absolute',
          top: '0.9rem',
          right: '0.9rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          <span className="card-servicio__dot" style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--verde)',
            animation: 'whatsappPulso 1.6s ease-out infinite',
          }} />
          {esHoy ? 'Hoy' : 'Próximo'}
        </span>
      )}
      <div className="card-servicio__sweep" style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '0%',
        height: '100%',
        backgroundColor: '#2BAF1E',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="card-servicio__dia" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: '1.5rem',
          color: 'var(--texto)',
          marginBottom: '0.75rem',
        }}>
          {dia}
        </p>
        {subtitulo && (
          <p className="card-servicio__sub" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--texto-suave)',
            marginBottom: '0.75rem',
          }}>
            {subtitulo}
          </p>
        )}
        {horarios.map((h) => (
          <p key={h} className="card-servicio__dia" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem',
            fontWeight: '300',
            color: 'var(--texto)',
            lineHeight: '1.8',
          }}>
            {h}
          </p>
        ))}
      </div>
    </div>
  )
}

function Servicios() {
  const refTitulo = useReveal()
  const refCountdown = useReveal()
  const refCards = useReveal()
  const { proximo, restante } = useProximoServicio()
  const esHoy = proximo.fecha.toDateString() === new Date().toDateString()
  const esUrgente = restante > 0 && restante < 2 * 60 * 60 * 1000

  return (
    <section id="servicios" style={{
      background: 'radial-gradient(ellipse 900px 600px at 15% 25%, rgba(61,220,4,0.09), transparent 65%), var(--fondo)',
      padding: 'clamp(3rem, 10vw, 8rem) 2rem',
      borderTop: '1px solid var(--borde)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div ref={refTitulo} className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative', zIndex: 1 }}>
        <p style={{
          color: 'var(--verde)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Únete a nosotros
        </p>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'var(--texto)',
        }}>
          Servicios
        </h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative', zIndex: 1 }}>
        <div ref={refCountdown} className="reveal glass-panel" style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '999px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          color: 'var(--texto-suave)',
          maxWidth: '100%',
          borderColor: esUrgente ? 'rgba(255,159,10,0.5)' : undefined,
          animation: esUrgente ? 'urgentPulso 1.8s ease-in-out infinite' : 'none',
        }}>
          <span>{esUrgente ? '¡Ya casi empieza!' : 'Próximo servicio:'} <strong style={{ color: 'var(--texto)' }}>{proximo.label}</strong></span>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '700',
            color: esUrgente ? '#FF9F0A' : 'var(--verde)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatearRestante(restante)}
          </span>
        </div>
      </div>

      <div ref={refCards} className="reveal" style={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
      }}>
        <CardServicio dia="Domingo" horarios={['9:45 AM', '11:45 AM']} activo={proximo.dia === 'Domingo'} esHoy={esHoy && proximo.dia === 'Domingo'} />
        <CardServicio dia="Miércoles" horarios={['7:00 PM']} activo={proximo.dia === 'Miércoles'} esHoy={esHoy && proximo.dia === 'Miércoles'} />
        <CardServicio dia="Lunes" subtitulo="Tabernáculo" horarios={['7:30 PM']} activo={proximo.dia === 'Lunes'} esHoy={esHoy && proximo.dia === 'Lunes'} />
      </div>

    </section>
  )
}

export default Servicios
import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import useReveal from '../hooks/useReveal'

const VERDE = '#3DDC04'
const VERDE_HOVER = '#2BAF1E'

function Contador({ fecha, hora }) {
  const calcular = () => {
    if (!fecha) return null
    const objetivo = new Date(fecha + 'T' + (hora || '00:00') + ':00')
    const ahora = new Date()
    const diff = objetivo - ahora
    if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
    return {
      dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diff / (1000 * 60)) % 60),
      segundos: Math.floor((diff / 1000) % 60),
    }
  }

  const [tiempo, setTiempo] = useState(calcular())

  useEffect(() => {
    const interval = setInterval(() => setTiempo(calcular()), 1000)
    return () => clearInterval(interval)
  }, [fecha, hora])

  if (!tiempo) return null
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
      {[
        { valor: pad(tiempo.dias), label: 'Días' },
        { valor: pad(tiempo.horas), label: 'Horas' },
        { valor: pad(tiempo.minutos), label: 'Min' },
        { valor: pad(tiempo.segundos), label: 'Seg' },
      ].map(function (item) {
        return (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.75rem 1rem', border: '1.5px solid var(--verde)', borderRadius: '10px', minWidth: '65px' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: '1.5rem', color: 'var(--verde)', lineHeight: '1' }}>{item.valor}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: '500', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--texto-suave)' }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function TarjetaEvento({ evento }) {
  const ref = useReveal()
  const linkWhatsapp = evento.whatsappMensaje
    ? 'https://wa.me/527711107903?text=' + encodeURIComponent(evento.whatsappMensaje)
    : null

  return (
    <div ref={ref} className="reveal" style={{
      border: '1.5px solid var(--verde)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      minWidth: '320px',
      maxWidth: '340px',
      flexShrink: 0,
      scrollSnapAlign: 'center',
      backgroundColor: 'var(--fondo)',
    }}>
      {evento.imagenUrl && (
        <img
          src={evento.imagenUrl}
          alt={evento.titulo}
          style={{ width: '100%', maxWidth: '260px', borderRadius: '14px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', marginBottom: '1.5rem' }}
        />
      )}

      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: 'var(--texto)', marginBottom: '0.5rem' }}>
        {evento.titulo}
      </h3>

      {evento.descripcion && (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--texto-suave)', margin: '0 auto 1rem auto', lineHeight: '1.7' }}>
          {evento.descripcion}
        </p>
      )}

      {(evento.fecha || evento.ubicacion) && (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', marginBottom: '0.5rem' }}>
          {evento.fecha}{evento.hora ? (' · ' + evento.hora) : ''}{evento.ubicacion ? (' · ' + evento.ubicacion) : ''}
        </p>
      )}

      {evento.mostrarContador && <Contador fecha={evento.fecha} hora={evento.hora} />}

      {linkWhatsapp && (
        
          <a href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: VERDE,
            color: '#000',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '700',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '0.8rem 1.75rem',
            borderRadius: '999px',
            textDecoration: 'none',
            marginTop: '0.5rem',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={function (e) { e.currentTarget.style.backgroundColor = VERDE_HOVER }}
          onMouseLeave={function (e) { e.currentTarget.style.backgroundColor = VERDE }}
        >
          Envíame información
        </a>
      )}
    </div>
  )
}

function ProximosEventos() {
  const [eventos, setEventos] = useState([])
  const refTitulo = useReveal()

  useEffect(() => {
    const q = query(collection(db, 'eventos'), orderBy('creado', 'desc'))
    const unsubscribe = onSnapshot(q, function (snapshot) {
      setEventos(snapshot.docs.map(function (d) {
        return { id: d.id, ...d.data() }
      }))
    })
    return () => unsubscribe()
  }, [])

  if (eventos.length === 0) return null

  return (
    <section style={{ backgroundColor: 'var(--fondo)', padding: '6rem 0', borderTop: '1px solid var(--borde)', overflow: 'hidden' }}>
      <div ref={refTitulo} style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 2rem' }}>
        <p style={{ color: 'var(--verde)', fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          No te lo pierdas
        </p>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--texto)' }}>
          Próximos Eventos
        </h2>
      </div>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        padding: '0.5rem 2rem 1.5rem 2rem',
        WebkitOverflowScrolling: 'touch',
      }}>
        {eventos.map(function (evento) {
          return <TarjetaEvento key={evento.id} evento={evento} />
        })}
      </div>
    </section>
  )
}

export default ProximosEventos
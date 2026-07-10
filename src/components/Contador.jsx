import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import flyer from '../assets/flyer-aun-hay-mas.webp'

function Contador() {
  const eventoFecha = new Date('2026-07-17T19:00:00')
  const refTitulo = useReveal()
  const refFlyer = useReveal()
  const refMapa = useReveal()
  const refCards = useReveal()
  const refBoton = useReveal()

  const calcular = () => {
    const ahora = new Date()
    const diff = eventoFecha - ahora
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
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid var(--borde)',
      textAlign: 'center',
    }}>

      <div ref={refTitulo} className="reveal">
        <p style={{
          color: 'var(--verde)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Próximo evento
        </p>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'var(--texto)',
          marginBottom: '0.5rem',
        }}>
          Aún hay más
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          color: 'var(--verde)',
          letterSpacing: '0.05em',
          marginBottom: '2.5rem',
        }}>
          Efesios 3:20
        </p>
      </div>

      <div ref={refFlyer} className="reveal">
        <img
          src={flyer}
          alt="Flyer Aún hay más - Viernes 17 de julio 7PM"
          style={{
            width: '100%',
            maxWidth: '360px',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            marginBottom: '3rem',
          }}
        />
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.95rem',
          color: 'var(--texto-suave)',
          maxWidth: '500px',
          margin: '0 auto 1rem auto',
          lineHeight: '1.8',
        }}>
          Esto apenas está comenzando. Una noche especial para creer que lo mejor está por venir.
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.95rem',
          color: 'var(--texto-suave)',
          marginBottom: '0',
        }}>
          Viernes 17 de julio · 7:00 PM · Tizayuca, Hidalgo
        </p>
      </div>

      <div ref={refMapa} className="reveal" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
        marginBottom: '3.5rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '476px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1.5px solid var(--verde)',
        }}>
          <iframe
            title="Ubicación del evento - Jardín las Flores"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.0!2d-98.9830247!3d19.846099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d191a8596a8321:0xd9153a1c7bc5c03d!2sJard%C3%ADn%20las%20flores!5e0!3m2!1ses!2smx!4v1234567890"
            width="100%"
            height="320"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
          color: 'var(--texto-suave)',
          marginTop: '0.75rem',
        }}>
          Jardín las Flores
        </p>
      </div>

      <div ref={refCards} className="reveal" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '3rem',
      }}>
        {[
          { valor: pad(tiempo.dias), label: 'Días' },
          { valor: pad(tiempo.horas), label: 'Horas' },
          { valor: pad(tiempo.minutos), label: 'Minutos' },
          { valor: pad(tiempo.segundos), label: 'Segundos' },
        ].map(({ valor, label }) => (
          <div key={label} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 2.5rem',
            border: '1.5px solid var(--verde)',
            borderRadius: '12px',
            minWidth: '110px',
          }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '900',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--verde)',
              lineHeight: '1',
              marginBottom: '0.5rem',
            }}>
              {valor}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--texto-suave)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div ref={refBoton} className="reveal">
        
          <a href="https://wa.me/527711107903?text=Hola%21%20Quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20evento%20%22A%C3%BAn%20hay%20m%C3%A1s%22%20del%20viernes%2017%20de%20julio.%20%C2%A1Gracias%21"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--verde)',
            color: '#000',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '700',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '1rem 2.5rem',
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--verde-hover)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--verde)'}
        >
          Envíame información
        </a>
      </div>

    </section>
  )
}

export default Contador
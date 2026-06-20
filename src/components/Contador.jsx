import { useState, useEffect } from 'react'

function Contador() {
  const eventoFecha = new Date('2026-07-17T19:00:00')

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
        Algo grande se acerca
      </h2>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        color: 'var(--texto-suave)',
        marginBottom: '3.5rem',
        maxWidth: '500px',
        margin: '0 auto 3.5rem auto',
        lineHeight: '1.8',
      }}>
        No te pierdas este 17 de julio — este domingo te enterarás de qué trata nuestro próximo evento.
      </p>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        color: 'var(--texto-suave)',
        marginBottom: '3.5rem',
      }}>
        17 de julio · 7:00 PM · Tizayuca, Hidalgo
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
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
            position: 'relative',
            overflow: 'hidden',
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

    </section>
  )
}

export default Contador
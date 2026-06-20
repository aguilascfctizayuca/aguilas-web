import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const fotos = [
  '/galeria-1.jpg',
  '/galeria-2.jpg',
  '/galeria-3.jpg',
  '/galeria-4.jpg',
  '/galeria-5.jpg',
  '/galeria-6.jpg',
]

function Galeria() {
  const refTitulo = useReveal()
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActual(prev => (prev + 1) % fotos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const anterior = () => setActual(prev => (prev - 1 + fotos.length) % fotos.length)
  const siguiente = () => setActual(prev => (prev + 1) % fotos.length)

  return (
    <section id="galeria" style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid var(--borde)',
    }}>

      <div ref={refTitulo} className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          color: 'var(--verde)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Nuestra comunidad
        </p>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: 'var(--texto)',
        }}>
          Momentos que nos definen
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

        {/* Imagen principal */}
        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          position: 'relative',
        }}>
          {fotos.map((foto, i) => (
            <img
              key={i}
              src={foto}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === actual ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
            />
          ))}

          {/* Botones */}
          <button onClick={anterior} style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none',
            color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px',
            borderRadius: '50%', cursor: 'pointer', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            ‹
          </button>
          <button onClick={siguiente} style={{
            position: 'absolute', right: '1rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none',
            color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px',
            borderRadius: '50%', cursor: 'pointer', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            ›
          </button>
        </div>

        {/* Miniaturas */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          justifyContent: 'center',
        }}>
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => setActual(i)}
              style={{
                width: '60px',
                height: '44px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: i === actual ? '2px solid var(--verde)' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
                flexShrink: 0,
              }}
            >
              <img src={foto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Galeria
import { useState } from 'react'

function CardServicio({ dia, subtitulo, horarios }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 240px',
        border: '1px solid #e0e0e0',
        padding: '3rem 2rem',
        textAlign: 'center',
        cursor: 'default',
        backgroundColor: hover ? '#2BAF1E' : 'transparent',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '900',
        fontSize: '1.5rem',
        color: hover ? '#ffffff' : 'var(--texto)',
        marginBottom: '0.75rem',
        transition: 'color 0.3s ease',
        fontWeight: '900',
      }}>
        {dia}
      </p>

      {subtitulo && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: hover ? 'rgba(255,255,255,0.7)' : 'var(--texto-suave)',
          marginBottom: '0.75rem',
          transition: 'color 0.3s ease',
        }}>
          {subtitulo}
        </p>
      )}

      {horarios.map((h) => (
        <p key={h} style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.1rem',
          fontWeight: '300',
          color: hover ? '#ffffff' : 'var(--texto)',
          lineHeight: '1.8',
          transition: 'color 0.3s ease',
        }}>
          {h}
        </p>
      ))}
    </div>
  )
}

function Servicios() {
  return (
    <section id="servicios" style={{
      backgroundColor: 'var(--fondo)',
      padding: '8rem 2rem',
      borderTop: '1px solid var(--borde)',
    }}>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        flexWrap: 'wrap',
      }}>
        <CardServicio dia="Domingo" horarios={['9:45 AM', '11:45 AM']} />
        <CardServicio dia="Miércoles" horarios={['7:00 PM']} />
        <CardServicio dia="Lunes" subtitulo="Tabernáculo" horarios={['7:30 PM']} />
      </div>

    </section>
  )
}

export default Servicios
import { useState } from 'react'

function CardServicio({ dia, subtitulo, horarios }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 220px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        cursor: 'default',
        borderRadius: '12px',
        border: '1.5px solid var(--verde)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ? '0 0 30px rgba(61,220,4,0.25)' : '0 0 0px rgba(61,220,4,0)',
      }}
    >
      {/* Fondo que se llena de izquierda a derecha */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: hover ? '100%' : '0%',
        height: '100%',
        backgroundColor: '#2BAF1E',
        transition: 'width 0.4s ease',
        zIndex: 0,
      }} />

      {/* Contenido encima del fondo */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: '1.5rem',
          color: hover ? '#ffffff' : 'var(--texto)',
          marginBottom: '0.75rem',
          transition: 'color 0.3s ease',
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
            color: hover ? 'rgba(255,255,255,0.8)' : 'var(--texto-suave)',
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
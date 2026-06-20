import { useState, useEffect } from 'react'

function Hero() {
  const [animado, setAnimado] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimado(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      backgroundColor: 'var(--fondo)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 2rem',
    }}>

      <p style={{
        color: 'var(--verde)',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        fontSize: '0.7rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        marginBottom: '2rem',
        opacity: animado ? 1 : 0,
        transition: 'opacity 0.8s ease 0.2s',
      }}>
        Tizayuca, Hidalgo
      </p>

      <h1 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '900',
        fontStyle: 'italic',
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        lineHeight: '1.0',
        color: 'var(--texto)',
        maxWidth: '800px',
        marginBottom: '2.5rem',
        opacity: animado ? 1 : 0,
        transform: animado ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease 0.4s',
      }}>
        Hay un lugar{' '}
        <span style={{ color: '#2BAF1E', fontStyle: 'italic' }}>para ti</span>
      </h1>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: '300',
        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
        color: 'var(--texto-suave)',
        maxWidth: '460px',
        lineHeight: '2',
        marginBottom: '4rem',
        opacity: animado ? 1 : 0,
        transition: 'opacity 0.8s ease 0.6s',
      }}>
        Conoce a Dios. Vive en libertad. Descubre tu propósito.
      </p>

      {/* Botón con efecto fill */}
      
        <a href="https://wa.me/527711107903?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20%C3%81guilas%20CFC"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block',
          backgroundColor: 'transparent',
          color: hover ? '#ffffff' : 'var(--texto)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          fontSize: '0.75rem',
          padding: '1rem 3rem',
          border: '1.5px solid var(--verde)',
          borderRadius: '4px',
          textDecoration: 'none',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: animado ? 1 : 0,
          transition: 'opacity 0.8s ease 0.8s, color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hover ? '0 0 20px rgba(61,220,4,0.3)' : 'none',
          zIndex: 1,
        }}
      >
        {/* Fondo que se llena */}
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: hover ? '100%' : '0%',
          height: '100%',
          backgroundColor: '#2BAF1E',
          transition: 'width 0.4s ease',
          zIndex: -1,
        }} />
        Visítanos este domingo
      </a>

    </section>
  )
}

export default Hero
import { useState, useEffect } from 'react'

const fotos = [
  '/foto-worship.jpg',
  '/foto-servicio1.jpg',
  '/foto-servicio2.jpg',
]

const TEXTO_COMPLETO = 'Ven como eres. Sal diferente.'

function Hero() {
  const [animado, setAnimado] = useState(false)
  const [hover, setHover] = useState(false)
  const [fotoActual, setFotoActual] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)
  const [textoVisible, setTextoVisible] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setAnimado(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter — arranca cuando animado se activa
  useEffect(() => {
    if (!animado) return
    let i = 0
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setTextoVisible(TEXTO_COMPLETO.slice(0, i + 1))
        i++
        if (i >= TEXTO_COMPLETO.length) clearInterval(interval)
      }, 45)
      return () => clearInterval(interval)
    }, 800) // espera un poco después de que aparece el h1
    return () => clearTimeout(delay)
  }, [animado])

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setFotoActual((prev) => (prev + 1) % fotos.length)
        setFadeIn(true)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 2rem',
      position: 'relative',
    }}>

      {/* Fondo con fade */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `url(${fotos[fotoActual]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.6s ease',
        zIndex: 0,
      }} />

      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 1,
      }} />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
          color: '#ffffff',
          maxWidth: '800px',
          marginBottom: '2.5rem',
          opacity: animado ? 1 : 0,
          transform: animado ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          Hay un lugar{' '}
          <span style={{ color: '#3DDC04', fontStyle: 'italic' }}>para ti</span>
        </h1>

        {/* Typewriter */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: '300',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '460px',
          lineHeight: '2',
          marginBottom: '4rem',
          minHeight: '2em',
        }}>
          {textoVisible}
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1.1em',
            backgroundColor: 'var(--verde)',
            marginLeft: '3px',
            verticalAlign: 'middle',
            animation: 'parpadeo 0.8s step-end infinite',
          }} />
        </p>

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
            color: '#ffffff',
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
            transition: 'opacity 0.8s ease 0.8s, box-shadow 0.3s ease',
            boxShadow: hover ? '0 0 20px rgba(61,220,4,0.4)' : 'none',
            zIndex: 1,
          }}
        >
          <span style={{
            position: 'absolute',
            top: 0, left: 0,
            width: hover ? '100%' : '0%',
            height: '100%',
            backgroundColor: '#2BAF1E',
            transition: 'width 0.4s ease',
            zIndex: -1,
          }} />
          Visítanos este domingo
        </a>

        {/* Indicadores */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '2rem',
          opacity: animado ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setFotoActual(i)}
              style={{
                width: i === fotoActual ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === fotoActual ? 'var(--verde)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero
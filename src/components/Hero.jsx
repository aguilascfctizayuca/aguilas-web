import { useState, useEffect } from 'react'
import useMagnetico from '../hooks/useMagnetico'
import useSyncedRotation from '../hooks/useSyncedRotation'

const fotos = [
  '/foto-worship.webp',
  '/foto-servicio1.webp',
  '/foto-servicio2.webp',
]

const INTERVALO_FOTOS = 5000

const TEXTO_COMPLETO = 'Ven como eres. Sal diferente.'

function Hero() {
  const [animado, setAnimado] = useState(false)
  const [hover, setHover] = useState(false)
  const [textoVisible, setTextoVisible] = useState('')
  const { ref: ctaRef, onMouseMove: onCtaMove, onMouseLeave: onCtaLeave } = useMagnetico(0.3)

  const sincronizado = useSyncedRotation(fotos.length, INTERVALO_FOTOS)
  const [manual, setManual] = useState(null)
  const [prevSincronizado, setPrevSincronizado] = useState(sincronizado)
  if (sincronizado !== prevSincronizado) {
    setPrevSincronizado(sincronizado)
    setManual(null)
  }
  const fotoActual = manual ?? sincronizado

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

      {/* Fondo con fade, apilado igual que Nosotros/Galería para que el cambio sea sincronizado */}
      {fotos.map((foto, i) => (
        <div
          key={foto}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === fotoActual ? 1 : 0,
            transition: 'opacity 0.8s ease',
            zIndex: 0,
          }}
        />
      ))}

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
          ref={ctaRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={(e) => { setHover(false); onCtaLeave(e) }}
          onMouseMove={onCtaMove}
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-block',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            fontSize: '0.75rem',
            border: '1.5px solid var(--verde)',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: animado ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s, box-shadow 0.3s ease, transform 0.15s ease-out',
            boxShadow: hover
              ? '0 0 20px rgba(61,220,4,0.4)'
              : 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05)',
            zIndex: 1,
          }}
        >
          {/* Capa de vidrio — sin hijos con z-index, para evitar el bug de Chromium con backdrop-filter */}
          <span style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            willChange: 'backdrop-filter',
          }} />
          {/* Capa de contenido — el barrido animado va aquí, separado del blur */}
          <span style={{ position: 'relative', display: 'block', padding: '1rem 3rem' }}>
            <span style={{
              position: 'absolute',
              top: 0, left: 0,
              width: hover ? '100%' : '0%',
              height: '100%',
              backgroundColor: '#2BAF1E',
              transition: 'width 0.4s ease',
            }} />
            <span style={{ position: 'relative' }}>Visítanos este domingo</span>
          </span>
        </a>

        {/* Indicadores */}
        <div className="glass" style={{
          display: 'flex',
          gap: '8px',
          marginTop: '2rem',
          padding: '10px 14px',
          borderRadius: '999px',
          opacity: animado ? 1 : 0,
          transition: 'opacity 0.8s ease 1s, background 0.4s ease, border-color 0.4s ease',
        }}>
          {fotos.map((_, i) => (
            <button
              key={i}
              aria-label={"Ver foto " + (i + 1)}
              onClick={() => setManual(i)}
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
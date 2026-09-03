import { useState, useEffect } from 'react'

const BARRAS = [40, 70, 45, 90, 55, 75, 35, 65]

function RadGenSplash({ onComplete }) {
  const [fase, setFase] = useState('entrando') // 'entrando' → 'saliendo' → 'listo'

  useEffect(() => {
    const t1 = setTimeout(() => setFase('saliendo'), 950)
    const t2 = setTimeout(() => {
      setFase('listo')
      onComplete()
    }, 1650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (fase === 'listo') return null

  const saliendo = fase === 'saliendo'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, pointerEvents: 'none' }}>
      <style>{`
        @keyframes radgenSplashLogoIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes radgenSplashBarra {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      {/* Cortinas — se abren desde el centro, como un dial que sintoniza */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '50%', height: '100%',
        backgroundColor: '#0F0F12',
        borderRight: '1px solid rgba(58,123,255,0.25)',
        transform: saliendo ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '50%', height: '100%',
        backgroundColor: '#0F0F12',
        borderLeft: '1px solid rgba(58,123,255,0.25)',
        transform: saliendo ? 'translateX(100%)' : 'translateX(0)',
        transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
      }} />

      {/* Logo + ecualizador, centrados sobre ambas cortinas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        opacity: saliendo ? 0 : 1,
        transform: saliendo ? 'scale(0.92)' : 'scale(1)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <img
          src="/radgen-logo.png"
          alt="RadGen Mx"
          style={{
            height: '64px',
            width: 'auto',
            animation: 'radgenSplashLogoIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '22px' }}>
          {BARRAS.map((h, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '3px',
                height: `${h}%`,
                borderRadius: '2px',
                background: 'linear-gradient(180deg, #8fb4ff, #3a7bff)',
                transformOrigin: 'bottom',
                animation: `radgenSplashBarra 1s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RadGenSplash

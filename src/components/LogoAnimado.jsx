import { useState, useEffect } from 'react'

function LogoAnimado({ onComplete }) {
  const [fase, setFase] = useState('entrando') // 'entrando' → 'saliendo' → 'listo'

  useEffect(() => {
    const t1 = setTimeout(() => setFase('saliendo'), 950)
    const t2 = setTimeout(() => {
      setFase('listo')
      onComplete()
    }, 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (fase === 'listo') return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: fase === 'saliendo' ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
      pointerEvents: fase === 'saliendo' ? 'none' : 'auto',
    }}>
      <img
        src="/ACFC.webp"
        alt="Águilas CFC"
        style={{
          width: '100px',
          height: '100px',
          animation: 'logoSplashIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      />
    </div>
  )
}

export default LogoAnimado

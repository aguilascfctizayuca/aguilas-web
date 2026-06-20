import { useState, useEffect } from 'react'

function LogoAnimado({ onComplete }) {
  const [fase, setFase] = useState('grande') // 'grande' → 'moviendose' → 'listo'

  useEffect(() => {
    const t1 = setTimeout(() => setFase('moviendose'), 1200)
    const t2 = setTimeout(() => {
      setFase('listo')
      onComplete()
    }, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (fase === 'listo') return null

  return (
    <div style={{
      position: 'fixed',
      zIndex: 200,
      top: fase === 'moviendose' ? '18px' : '50%',
      left: fase === 'moviendose' ? '24px' : '50%',
      transform: fase === 'moviendose' ? 'translate(0, 0)' : 'translate(-50%, -50%)',
      transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'none',
    }}>
      <img
        src="/ACFC.png"
        alt="Águilas CFC"
        style={{
          width: fase === 'moviendose' ? '36px' : '140px',
          height: fase === 'moviendose' ? '36px' : '140px',
          transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}

export default LogoAnimado
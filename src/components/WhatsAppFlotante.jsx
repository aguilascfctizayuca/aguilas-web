import { useState, useEffect } from 'react'
import useMagnetico from '../hooks/useMagnetico'

function WhatsAppFlotante() {
  const [visible, setVisible] = useState(false)
  const { ref: btnRef, onMouseMove: onBtnMove, onMouseLeave: onBtnLeave } = useMagnetico(0.35)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href="https://wa.me/527711107903?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20%C3%81guilas%20CFC"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      ref={btnRef}
      onMouseMove={visible ? onBtnMove : undefined}
      onMouseLeave={onBtnLeave}
      style={{
        position: 'fixed',
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        right: '1.5rem',
        zIndex: 90,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <span style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        backgroundColor: '#25D366',
        animation: visible ? 'whatsappPulso 2.2s ease-out infinite' : 'none',
        zIndex: -1,
      }} />
      <span className="whatsapp-bounce" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.489 1.34 5.007L2 22l5.117-1.334a9.96 9.96 0 0 0 4.887 1.278h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.928-7.069a9.93 9.93 0 0 0-7.07-2.875zm5.833 15.83c-.246.694-1.435 1.36-1.973 1.443-.503.076-1.14.109-1.836-.115-.423-.135-.966-.315-1.663-.617-2.927-1.264-4.838-4.213-4.985-4.409-.148-.198-1.194-1.588-1.194-3.029 0-1.44.756-2.147 1.024-2.442.267-.297.585-.371.78-.371.198 0 .397.002.57.01.184.008.43-.07.672.512.246.594.836 2.052.91 2.201.074.148.124.322.025.52-.099.198-.149.322-.297.495-.148.174-.311.388-.445.52-.148.149-.303.31-.13.607.173.298.767 1.266 1.645 2.05 1.13 1.007 2.084 1.318 2.38 1.468.297.148.47.124.644-.075.174-.198.744-.868.941-1.165.198-.297.396-.248.669-.15.272.1 1.732.817 2.03.967.297.15.495.223.57.347.074.124.074.719-.172 1.413z" />
        </svg>
      </span>
    </a>
  )
}

export default WhatsAppFlotante

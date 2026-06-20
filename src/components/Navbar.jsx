import { useState, useEffect } from 'react'

function Navbar({ logoVisible }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    const target = document.querySelector(href)
    if (!target) return
    const reveals = target.querySelectorAll('.reveal')
    reveals.forEach(el => {
      el.classList.remove('visible')
      setTimeout(() => el.classList.add('visible'), 400)
    })
  }

  const linkStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--texto-suave)',
    textDecoration: 'none',
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '1.2rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: scrolled ? 'var(--fondo)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--borde)' : 'none',
      transition: 'background-color 0.4s ease',
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src="/ACFC.png"
          alt="Águilas CFC"
          style={{
            width: '36px',
            height: '36px',
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          fontSize: '0.95rem',
          color: 'var(--texto)',
          letterSpacing: '0.05em',
        }}>
          ÁGUILAS CFC
        </span>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="#nosotros" onClick={() => handleNavClick('#nosotros')} style={linkStyle}>Nosotros</a>
        <a href="#servicios" onClick={() => handleNavClick('#servicios')} style={linkStyle}>Servicios</a>
        <a href="#grupos" onClick={() => handleNavClick('#grupos')} style={linkStyle}>Grupos</a>
        <a href="#dar" onClick={() => handleNavClick('#dar')} style={linkStyle}>Dar</a>
      </div>

    </nav>
  )
}

export default Navbar
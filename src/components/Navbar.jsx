import { useState, useEffect } from 'react'

function Navbar({ logoVisible }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--texto-suave)',
    textDecoration: 'none',
  }

  const handleNavClick = (href) => {
    setMenuAbierto(false)
    const target = document.querySelector(href)
    if (!target) return
    const reveals = target.querySelectorAll('.reveal')
    reveals.forEach(el => {
      el.classList.remove('visible')
      setTimeout(() => el.classList.add('visible'), 400)
    })
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: scrolled || menuAbierto ? 'var(--fondo)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--borde)' : 'none',
        transition: 'background-color 0.4s ease',
      }}>

        {/* Logo + Nombre */}
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
            whiteSpace: 'nowrap',
          }}>
            ÁGUILAS CFC
          </span>
        </div>

        {/* Links desktop */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }} className="nav-desktop">
          <a href="#nosotros" onClick={() => handleNavClick('#nosotros')} style={linkStyle}>Nosotros</a>
          <a href="#servicios" onClick={() => handleNavClick('#servicios')} style={linkStyle}>Servicios</a>
          <a href="#grupos" onClick={() => handleNavClick('#grupos')} style={linkStyle}>Grupos</a>
          <a href="#dar" onClick={() => handleNavClick('#dar')} style={linkStyle}>Dar</a>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="nav-hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--texto)', transition: 'all 0.3s', transform: menuAbierto ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--texto)', transition: 'all 0.3s', opacity: menuAbierto ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--texto)', transition: 'all 0.3s', transform: menuAbierto ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

      </nav>

      {/* Menú móvil */}
      <div style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: 'var(--fondo)',
        borderBottom: '1px solid var(--borde)',
        padding: menuAbierto ? '2rem 1.5rem' : '0 1.5rem',
        maxHeight: menuAbierto ? '300px' : '0',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <a href="#nosotros" onClick={() => handleNavClick('#nosotros')} style={{ ...linkStyle, fontSize: '1.1rem' }}>Nosotros</a>
        <a href="#servicios" onClick={() => handleNavClick('#servicios')} style={{ ...linkStyle, fontSize: '1.1rem' }}>Servicios</a>
        <a href="#grupos" onClick={() => handleNavClick('#grupos')} style={{ ...linkStyle, fontSize: '1.1rem' }}>Grupos</a>
        <a href="#dar" onClick={() => handleNavClick('#dar')} style={{ ...linkStyle, fontSize: '1.1rem' }}>Dar</a>
      </div>
    </>
  )
}

export default Navbar
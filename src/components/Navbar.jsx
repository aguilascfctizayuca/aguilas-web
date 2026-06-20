import { useState, useEffect } from 'react'

function Navbar({ logoVisible }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <nav className={scrolled ? 'scrolled' : ''} style={{
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src="/ACFC.webp"
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
            color: scrolled ? 'var(--texto)' : '#ffffff',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}>
            ÁGUILAS CFC TIZAYUCA
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="nav-desktop">
          <a href="#nosotros" onClick={() => handleNavClick('#nosotros')} className="nav-pill">Nosotros</a>
          <a href="#servicios" onClick={() => handleNavClick('#servicios')} className="nav-pill">Servicios</a>
          <a href="#valores" onClick={() => handleNavClick('#valores')} className="nav-pill">Valores</a>
          <a href="#contacto" onClick={() => handleNavClick('#contacto')} className="nav-pill">Contacto</a>
        </div>

        <button
          aria-label={menuAbierto ? 'Cerrar menu' : 'Abrir menu'}
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
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: scrolled ? 'var(--texto)' : '#ffffff', transition: 'all 0.3s', transform: menuAbierto ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: scrolled ? 'var(--texto)' : '#ffffff', transition: 'all 0.3s', opacity: menuAbierto ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: scrolled ? 'var(--texto)' : '#ffffff', transition: 'all 0.3s', transform: menuAbierto ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

      </nav>

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
        gap: '0.5rem',
      }}>
        <a href="#nosotros" onClick={() => handleNavClick('#nosotros')} className="nav-pill-movil">Nosotros</a>
        <a href="#servicios" onClick={() => handleNavClick('#servicios')} className="nav-pill-movil">Servicios</a>
        <a href="#valores" onClick={() => handleNavClick('#valores')} className="nav-pill-movil">Valores</a>
        <a href="#contacto" onClick={() => handleNavClick('#contacto')} className="nav-pill-movil">Contacto</a>
      </div>
    </>
  )
}

export default Navbar
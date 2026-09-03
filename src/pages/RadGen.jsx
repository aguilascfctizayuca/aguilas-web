import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Contacto', href: '#contacto' },
];

function RadGen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      color: '#F5F3EE',
      fontFamily: 'Inter, sans-serif',
      background: '#0F0F12',
    }}>
      <style>{`
        .radgen-nav-links { display: flex; gap: 2rem; }
        .radgen-nav-links a { position: relative; transition: color 0.2s ease; }
        .radgen-nav-links a:hover { color: #3a7bff; }
        .radgen-nav-toggle { display: none; }
        .radgen-nav-mobile-panel { display: none; }
        .radgen-nav-mobile-panel a { transition: color 0.2s ease; }
        .radgen-nav-mobile-panel a:hover { color: #3a7bff; }
        @media (max-width: 768px) {
          .radgen-nav-links { display: none; }
          .radgen-nav-toggle { display: flex; }
          .radgen-nav-mobile-panel.open { display: flex; }
        }
      `}</style>

      <iframe
        src="/radgen-fondo.html"
        title="Fondo RadGen"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          background: 'rgba(15,15,18,0.75)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(58,123,255,0.25)',
        }}>
          <img
            src="/radgen-logo.png"
            alt="RadGen Mx"
            style={{ height: '42px', width: 'auto', display: 'block' }}
          />

          <div className="radgen-nav-links">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="radgen-nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menú"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F5F3EE',
              fontSize: '1.5rem',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>

        <div className={`radgen-nav-mobile-panel${menuOpen ? ' open' : ''}`} style={{
          flexDirection: 'column',
          background: 'rgba(15,15,18,0.97)',
          padding: '1rem 1.5rem',
          gap: '1rem',
          borderBottom: '1px solid rgba(58,123,255,0.25)',
        }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}>
          <div style={{
            position: 'relative',
            width: 'min(95vw, 1100px)',
            height: 'min(78vh, 800px)',
          }}>
            <iframe
              src="/radgen-pop-type.html"
              title="Logo RadGen Mx"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Resto del contenido de la página va aquí abajo */}

      </div>
    </div>
  )
}

export default RadGen

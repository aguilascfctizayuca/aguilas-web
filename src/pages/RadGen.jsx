import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RadGenSplash from '../components/RadGenSplash'

const BARRAS = [40, 70, 45, 90, 55, 75, 35, 65, 50, 80, 42, 60]

function RadGen() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      color: '#F5F3EE',
      fontFamily: 'Inter, sans-serif',
      background: '#0F0F12',
    }}>
      <RadGenSplash />

      <style>{`
        @keyframes radgenLiveDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(58,123,255,0.5); }
          50% { opacity: 0.5; box-shadow: 0 0 0 4px rgba(58,123,255,0); }
        }
        @keyframes radgenBarra {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .radgen-barra {
          animation: radgenBarra 1.4s ease-in-out infinite;
          transform-origin: bottom;
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
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          background: 'rgba(15,15,18,0.75)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(58,123,255,0.25)',
        }}>
          <Link to="/" className="glass radgen-volver">
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Águilas CFC</span>
          </Link>

          <img
            src="/radgen-logo.png"
            alt="RadGen Mx"
            style={{
              height: '42px',
              width: 'auto',
              display: 'block',
              justifySelf: 'center',
            }}
          />
        </nav>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
        }}>
          <div style={{
            position: 'relative',
            width: 'min(92vw, 640px)',
            padding: 'clamp(2.25rem, 6vw, 4rem)',
            borderRadius: '32px',
            textAlign: 'center',
            background: 'radial-gradient(130% 100% at 20% -10%, rgba(143,180,255,0.16), transparent 55%), rgba(15,15,18,0.55)',
            border: '1px solid rgba(58,123,255,0.32)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.03), 0 40px 90px -24px rgba(58,123,255,0.4), 0 0 0 1px rgba(58,123,255,0.08)',
          }}>

            {/* Ecualizador decorativo */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '28px', marginBottom: '1.5rem' }}>
              {BARRAS.map((h, i) => (
                <span
                  key={i}
                  className="radgen-barra"
                  style={{
                    display: 'block',
                    width: '3px',
                    height: `${h}%`,
                    borderRadius: '2px',
                    background: 'linear-gradient(180deg, #8fb4ff, #3a7bff)',
                    animationDelay: `${i * 0.09}s`,
                  }}
                />
              ))}
            </div>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#8fb4ff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(58,123,255,0.35)',
              backgroundColor: 'rgba(58,123,255,0.08)',
              marginBottom: '1.75rem',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#8fb4ff',
                animation: 'radgenLiveDot 1.8s ease-in-out infinite',
              }} />
              Señal en camino
            </span>

            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.1rem, 5.5vw, 3.2rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginBottom: '1.5rem',
            }}>
              Algo grande{' '}
              <span style={{
                background: 'linear-gradient(90deg, #8fb4ff, #3a7bff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontStyle: 'italic',
              }}>
                está por llegar.
              </span>
            </h1>

            <div style={{
              width: '48px',
              height: '3px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #3a7bff, #8fb4ff)',
              margin: '0 auto 1.5rem auto',
            }} />

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(245,243,238,0.65)',
              lineHeight: 1.8,
              marginBottom: 0,
            }}>
              Estamos preparando{' '}
              <strong style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(90deg, #F5F3EE, #8fb4ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
              }}>
                RadGen Education
              </strong>
              {' '}— vuelve pronto.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}>
              <a
                href="https://www.instagram.com/radgen.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="radgen-cta"
              >
                Únete a nuestra comunidad
              </a>
              <a
                href="https://www.instagram.com/radgen.mx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RadGen Mx en Instagram"
                className="glass radgen-social"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RadGen

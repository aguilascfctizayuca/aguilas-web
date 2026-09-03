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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem 1.5rem',
          background: 'rgba(15,15,18,0.75)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(58,123,255,0.25)',
        }}>
          <img
            src="/radgen-logo.png"
            alt="RadGen Mx"
            style={{ height: '42px', width: 'auto', display: 'block' }}
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
            width: 'min(92vw, 620px)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            borderRadius: '28px',
            textAlign: 'center',
            background: 'rgba(15,15,18,0.55)',
            border: '1px solid rgba(58,123,255,0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -20px rgba(58,123,255,0.35), 0 0 0 1px rgba(58,123,255,0.08)',
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
              fontSize: 'clamp(1.9rem, 5vw, 2.9rem)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
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

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(245,243,238,0.65)',
              lineHeight: 1.8,
              marginBottom: 0,
            }}>
              Estamos preparando{' '}
              <strong style={{ color: '#F5F3EE', fontWeight: 700 }}>RadGen Education</strong>
              {' '}— vuelve pronto.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RadGen

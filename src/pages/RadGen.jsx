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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          textAlign: 'center',
        }}>
          <span style={{
            display: 'inline-block',
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
            marginBottom: '1.5rem',
          }}>
            Próximamente
          </span>

          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            maxWidth: '700px',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}>
            Algo grande está por llegar.
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(245,243,238,0.65)',
            maxWidth: '480px',
            lineHeight: 1.8,
          }}>
            Estamos preparando{' '}
            <strong style={{
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
        </div>

      </div>
    </div>
  )
}

export default RadGen

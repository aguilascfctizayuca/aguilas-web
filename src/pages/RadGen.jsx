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
          <div style={{
            position: 'relative',
            width: 'min(90vw, 900px)',
            height: 'min(60vh, 620px)',
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

          <p style={{
            color: '#3a7bff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}>
            Próximamente
          </p>

          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            maxWidth: '700px',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            Algo grande está por llegar.
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(245,243,238,0.7)',
            maxWidth: '480px',
            lineHeight: 1.8,
          }}>
            Estamos preparando <strong style={{ color: '#F5F3EE' }}>RadGen Education</strong> — vuelve pronto.
          </p>
        </div>

      </div>
    </div>
  )
}

export default RadGen

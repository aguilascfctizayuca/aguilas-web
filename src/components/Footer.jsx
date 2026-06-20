function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--fondo)',
      borderTop: '1px solid #e0e0e0',
      padding: '5rem 2rem 3rem',
    }}>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3rem',
        marginBottom: '4rem',
      }}>

        {/* Columna 1 — Logo */}
        <div style={{ flex: '1 1 200px' }}>
          <img src="/ACFC.png" alt="Águilas CFC" style={{ width: '50px', height: '50px', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.95rem', color: 'var(--texto)', marginBottom: '0.5rem' }}>
            ÁGUILAS CFC
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', lineHeight: '1.7' }}>
            Tizayuca, Hidalgo, México
          </p>
        </div>

        {/* Columna 2 — Servicios */}
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--texto)', marginBottom: '1.5rem' }}>
            Servicios
          </p>
          {['Domingo 9:45 AM', 'Domingo 11:45 AM', 'Miércoles 7:00 PM', 'Lunes 7:30 PM'].map((item) => (
            <p key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', marginBottom: '0.75rem' }}>
              {item}
            </p>
          ))}
        </div>

        {/* Columna 3 — Navegación */}
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--texto)', marginBottom: '1.5rem' }}>
            Explora
          </p>
          {[['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Valores', '#valores'], ['Contacto', '#contacto']].map(([label, href]) => (
            <a key={label} href={href} style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', textDecoration: 'none', marginBottom: '0.75rem' }}>
              {label}
            </a>
          ))}
        </div>

        {/* Columna 4 — Redes */}
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--texto)', marginBottom: '1.5rem' }}>
            Síguenos
          </p>
          <a href="https://www.facebook.com/aguilascentrofamiliarcristianotizayuca" target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', textDecoration: 'none', marginBottom: '0.75rem' }}>
            Facebook
          </a>
          <a href="https://www.instagram.com/aguilascfctizayuca" target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--texto-suave)', textDecoration: 'none', marginBottom: '0.75rem' }}>
            Instagram
          </a>
        </div>

      </div>

      {/* Línea inferior */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--texto-suave)' }}>
          © 2026 Águilas Centro Familiar Cristiano Tizayuca
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--texto-suave)' }}>
          Hay un lugar para ti
        </p>
      </div>

    </footer>
  )
}

export default Footer
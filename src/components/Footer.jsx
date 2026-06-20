function Footer() {
  const links = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Valores', href: '#valores' },
    { label: 'Contacto', href: '#contacto' },
  ]

  const horarios = [
    'Domingo 9:45 AM',
    'Domingo 11:45 AM',
    'Miércoles 7:00 PM',
    'Lunes 7:30 PM - Tabernáculo',
  ]

  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #1a1a1a',
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
        <div style={{ flex: '1 1 200px' }}>
          <img src="/ACFC.png" alt="Águilas CFC" style={{ width: '56px', height: '56px', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            ÁGUILAS CFC
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', lineHeight: '1.7', marginBottom: '1rem' }}>
            Tizayuca, Hidalgo, México
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: '0.9rem', color: '#3DDC04' }}>
            Hay un lugar para ti
          </p>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
            Horarios
          </p>
          {horarios.map((item) => (
            <p key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', marginBottom: '0.75rem', lineHeight: '1.5' }}>
              {item}
            </p>
          ))}
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
            Explora
          </p>
          {links.map((link) => (
            <a key={link.label} href={link.href} style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', textDecoration: 'none', marginBottom: '0.75rem' }}>
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
            Contacto
          </p>
          <a href="https://wa.me/527711107903" target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', textDecoration: 'none', marginBottom: '0.75rem' }}>
            WhatsApp
          </a>
          <a href="https://www.facebook.com/share/1DtXzksGaU/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', textDecoration: 'none', marginBottom: '0.75rem' }}>
            Facebook
          </a>
          <a href="https://www.instagram.com/aguilascfctizayuca" target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#666666', textDecoration: 'none', marginBottom: '0.75rem' }}>
            Instagram
          </a>
        </div>
      </div>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid #1a1a1a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#444444' }}>
          2026 Águilas Centro Familiar Cristiano Tizayuca
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#444444' }}>
          Tizayuca, Hidalgo, México
        </p>
      </div>
    </footer>
  )
}

export default Footer

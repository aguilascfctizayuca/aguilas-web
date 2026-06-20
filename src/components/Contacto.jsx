function Contacto() {
  return (
    <section id="contacto" style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid #e5e5e5',
      textAlign: 'center',
    }}>

      <p style={{
        color: 'var(--verde)',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        fontSize: '0.75rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}>
        Encuéntranos
      </p>

      <h2 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '900',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        color: 'var(--texto)',
        marginBottom: '1.5rem',
      }}>
        Un lugar para ti
      </h2>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        color: 'var(--texto-suave)',
        marginBottom: '3rem',
        lineHeight: '1.8',
      }}>
        Tizayuca, Hidalgo, México
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <a href="https://www.facebook.com/aguilascentrofamiliarcristianotizayuca" target="_blank" rel="noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: '600', color: 'var(--verde)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Facebook
        </a>
        <a href="https://www.instagram.com/aguilascfctizayuca" target="_blank" rel="noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: '600', color: 'var(--verde)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Instagram
        </a>
      </div>

    </section>
  )
}

export default Contacto
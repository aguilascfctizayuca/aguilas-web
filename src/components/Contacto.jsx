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

      {/* Mapa */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto 3rem auto',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.5!2d-98.9736736!3d19.8445632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d19164776bf50b%3A0x1c5afbc0776cadef!2s%C3%81guilas%20Centro%20Familiar%20Cristiano%20Tizayuca!5e0!3m2!1ses!2smx!4v1234567890!5m2!1ses!2smx"
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Águilas CFC"
        />
      </div>

    </section>
  )
}

export default Contacto
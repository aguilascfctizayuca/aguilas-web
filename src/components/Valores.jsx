function Valores() {
  const valores = [
    { titulo: 'Jesús', descripcion: 'El centro de todo lo que hacemos.' },
    { titulo: 'Familia', descripcion: 'Es nuestra responsabilidad y nuestra mayor bendición.' },
    { titulo: 'Fe en las personas', descripcion: 'Creemos en el potencial de cada persona.' },
    { titulo: 'Unidad', descripcion: 'Trabajamos en equipo, juntos somos más.' },
    { titulo: 'Comunidad', descripcion: 'Relaciones saludables que nos hacen crecer.' },
    { titulo: 'Legado', descripcion: 'Vivimos pensando en las generaciones que vienen.' },
    { titulo: 'Crecimiento', descripcion: 'Rendición de cuentas y mejora constante.' },
    { titulo: 'Propósito', descripcion: 'Identidad en el servicio a los demás.' },
    { titulo: 'Generosidad', descripcion: 'Damos porque fuimos dados.' },
    { titulo: 'Excelencia', descripcion: 'Todo lo que hacemos, lo hacemos bien.' },
  ]

  return (
    <section id="valores" style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid #e5e5e5',
    }}>

      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          color: 'var(--verde)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Lo que nos define
        </p>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: 'var(--texto)',
        }}>
          Nuestros valores
        </h2>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {valores.map((valor) => (
          <div key={valor.titulo} style={{
            padding: '2rem 1.5rem',
            border: '1px solid #e5e5e5',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              fontSize: '1rem',
              color: 'var(--verde)',
              marginBottom: '0.5rem',
            }}>
              {valor.titulo}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: 'var(--texto-suave)',
              lineHeight: '1.7',
            }}>
              {valor.descripcion}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Valores
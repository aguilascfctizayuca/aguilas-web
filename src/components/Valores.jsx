import { useState } from 'react'
import useReveal from '../hooks/useReveal'

function Valores() {
  const [abierto, setAbierto] = useState(null)
  const refTitulo = useReveal()
  const refLista = useReveal()

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

  const toggle = (titulo) => {
    setAbierto(abierto === titulo ? null : titulo)
  }

  return (
    <section id="valores" style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid #e5e5e5',
    }}>

      <div ref={refTitulo} className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          Nuestros Valores
        </h2>
      </div>

      <div ref={refLista} className="reveal" style={{ maxWidth: '700px', margin: '0 auto' }}>
        {valores.map((valor, index) => (
          <div
            key={valor.titulo}
            style={{
              borderBottom: '1px solid var(--borde)',
              borderTop: index === 0 ? '1px solid var(--borde)' : 'none',
            }}
          >
            <button
              onClick={() => toggle(valor.titulo)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '700',
                fontSize: '1rem',
                color: abierto === valor.titulo ? 'var(--verde)' : 'var(--texto)',
                transition: 'color 0.2s ease',
              }}>
                {valor.titulo}
              </span>
              <span style={{
                color: 'var(--verde)',
                fontSize: '1.25rem',
                fontWeight: '300',
                transition: 'transform 0.3s ease',
                transform: abierto === valor.titulo ? 'rotate(45deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>
                +
              </span>
            </button>
            <div style={{
              overflow: 'hidden',
              maxHeight: abierto === valor.titulo ? '200px' : '0',
              transition: 'max-height 0.3s ease',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--texto-suave)',
                lineHeight: '1.7',
                paddingBottom: '1.25rem',
              }}>
                {valor.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Valores
import { useState } from 'react'
import useReveal from '../hooks/useReveal'

function Valores() {
  const refTitulo = useReveal()
  const refGrid = useReveal()

  const valores = [
    'Jesús',
    'Familia',
    'Fe en las personas',
    'Unidad',
    'Comunidad',
    'Legado',
    'Crecimiento',
    'Propósito',
    'Generosidad',
    'Excelencia',
  ]

  return (
    <section id="valores" style={{
      backgroundColor: 'var(--fondo)',
      padding: '6rem 2rem',
      borderTop: '1px solid var(--borde)',
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

      <div ref={refGrid} className="reveal valores-grid" style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
      }}>
        {valores.map((valor) => (
          <ValorCard key={valor} titulo={valor} />
        ))}
      </div>

    </section>
  )
}

function ValorCard({ titulo }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1rem',
        borderRadius: '12px',
        border: '1.5px solid var(--borde)',
        textAlign: 'center',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        borderColor: hovered ? 'var(--verde)' : 'var(--borde)',
        boxShadow: hovered ? '0 0 20px rgba(61,220,4,0.15)' : 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        top: 0, left: 0,
        width: hovered ? '100%' : '0%',
        height: '100%',
        backgroundColor: 'var(--verde)',
        transition: 'width 0.4s ease',
        zIndex: 0,
      }} />
      <span style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        fontSize: '0.95rem',
        color: hovered ? '#000000' : 'var(--texto)',
        transition: 'color 0.3s ease',
      }}>
        {titulo}
      </span>
    </div>
  )
}

export default Valores
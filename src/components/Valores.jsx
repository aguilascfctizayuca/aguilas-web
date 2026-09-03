import { useState } from 'react'
import {
  Cross, Home, HandHeart, Handshake, Users,
  Crown, Sprout, Compass, Gift, Award,
} from 'lucide-react'
import useReveal from '../hooks/useReveal'

// Fila 1: los dos valores pilar (destacados). Filas 2-3: grid parejo de 4x2.
const VALORES = [
  { nombre: 'Jesús', Icono: Cross, span: 2 },
  { nombre: 'Comunidad', Icono: Users, span: 2 },
  { nombre: 'Familia', Icono: Home, span: 1 },
  { nombre: 'Fe en las personas', Icono: HandHeart, span: 1 },
  { nombre: 'Unidad', Icono: Handshake, span: 1 },
  { nombre: 'Legado', Icono: Crown, span: 1 },
  { nombre: 'Crecimiento', Icono: Sprout, span: 1 },
  { nombre: 'Propósito', Icono: Compass, span: 1 },
  { nombre: 'Generosidad', Icono: Gift, span: 1 },
  { nombre: 'Excelencia', Icono: Award, span: 1 },
]

function Valores() {
  const refTitulo = useReveal()
  const refGrid = useReveal()

  return (
    <section id="valores" style={{
      background: 'radial-gradient(ellipse 900px 700px at 85% 10%, rgba(61,220,4,0.08), transparent 65%), var(--fondo)',
      padding: 'clamp(2.5rem, 8vw, 6rem) 2rem',
      borderTop: '1px solid var(--borde)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div ref={refTitulo} className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}>
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
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: 'minmax(110px, auto)',
        gap: '1rem',
      }}>
        {VALORES.map((valor) => (
          <ValorCard key={valor.nombre} {...valor} />
        ))}
      </div>

    </section>
  )
}

function ValorCard({ nombre, Icono, span }) {
  const [hovered, setHovered] = useState(false)
  const destacado = span === 2

  return (
    <div
      className={`valor-card${destacado ? ' valor-destacado' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '18px',
        border: '1px solid var(--borde-glass)',
        borderColor: hovered ? 'rgba(61,220,4,0.5)' : undefined,
        cursor: 'default',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Capa de vidrio — sin hijos con z-index, para evitar el bug de Chromium con backdrop-filter */}
      <span className="glass-panel" style={{ position: 'absolute', inset: 0, border: 'none', borderRadius: '18px' }} />

      {/* Capa de contenido — el barrido animado va aquí, separado del blur */}
      <div className="valor-card__body" style={{
        position: 'relative',
        padding: destacado ? '1.75rem' : '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '0.6rem',
      }}>
        <span style={{
          position: 'absolute',
          top: 0, left: 0,
          width: hovered ? '100%' : '0%',
          height: '100%',
          backgroundColor: 'var(--verde)',
          transition: 'width 0.4s ease',
        }} />
        <Icono
          size={destacado ? 28 : 22}
          strokeWidth={1.75}
          style={{
            position: 'relative',
            color: hovered ? '#000000' : 'var(--verde)',
            transition: 'color 0.3s ease',
          }}
        />
        <span style={{
          position: 'relative',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          fontSize: destacado ? '1.15rem' : '0.95rem',
          color: hovered ? '#000000' : 'var(--texto)',
          transition: 'color 0.3s ease',
        }}>
          {nombre}
        </span>
      </div>
    </div>
  )
}

export default Valores

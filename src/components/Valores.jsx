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

      <div className="valores-grid" style={{
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
  const destacado = span === 2

  return (
    <div
      className={`glass-panel valor-card${destacado ? ' valor-destacado' : ''}`}
      style={{
        gridColumn: `span ${span}`,
        position: 'relative',
        padding: destacado ? '1.75rem' : '1.5rem',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '0.6rem',
        cursor: 'default',
      }}
    >
      <Icono
        size={destacado ? 28 : 22}
        strokeWidth={1.75}
        className="valor-card__icon"
        style={{ position: 'relative' }}
      />
      <span className="valor-card__label" style={{
        position: 'relative',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        fontSize: destacado ? '1.15rem' : '0.95rem',
      }}>
        {nombre}
      </span>
    </div>
  )
}

export default Valores

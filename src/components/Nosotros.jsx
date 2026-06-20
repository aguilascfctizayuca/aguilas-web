import useReveal from '../hooks/useReveal'

function Nosotros() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()

  return (
    <section id="nosotros" style={{
      backgroundColor: 'var(--fondo)',
      padding: '8rem 2rem',
      borderTop: '1px solid #e0e0e0',
    }}>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div ref={ref1} className="reveal">
          <p style={{
            color: 'var(--verde)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Quiénes somos
          </p>

          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '900',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--texto)',
            marginBottom: '2rem',
            maxWidth: '600px',
          }}>
            No somos una iglesia de eventos. Somos una familia.
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            color: 'var(--texto-suave)',
            lineHeight: '1.9',
            marginBottom: '4rem',
            maxWidth: '620px',
          }}>
            Somos una iglesia que cree y vive de acuerdo a la Palabra de Dios.
            Queremos que cada persona descubra que no está sola, que tiene un lugar
            donde pertenecer y un propósito que alcanzar.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>

          <div ref={ref2} className="reveal" style={{ flex: '1 1 260px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--verde)',
              marginBottom: '0.75rem',
            }}>
              Visión
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: 'var(--texto)',
              lineHeight: '1.8',
            }}>
              Ser una comunidad que conoce profundamente a Dios, vive en libertad
              y descubre su propósito e identidad — haciendo la diferencia y
              dejando huella en el mundo.
            </p>
          </div>

          <div ref={ref3} className="reveal" style={{ flex: '1 1 260px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--verde)',
              marginBottom: '0.75rem',
            }}>
              Misión
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: 'var(--texto)',
              lineHeight: '1.8',
            }}>
              Acercamos personas a Dios y formamos discípulos que sean líderes
              de impacto e influencia en su sociedad.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Nosotros
import useReveal from '../hooks/useReveal'

function Nosotros() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()
  const ref4 = useReveal()

  return (
    <section id="nosotros" style={{
      backgroundColor: 'var(--fondo)',
      padding: '8rem 2rem',
      borderTop: '1px solid #e0e0e0',
    }}>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Texto + foto pastor */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem',
        }}>
          <div ref={ref1} className="reveal" style={{ flex: '1 1 300px' }}>
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
            }}>
              No somos una iglesia de eventos. Somos una familia.
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.05rem',
              color: 'var(--texto-suave)',
              lineHeight: '1.9',
            }}>
              Somos una iglesia que cree y vive de acuerdo a la Palabra de Dios.
              Queremos que cada persona descubra que no está sola, que tiene un lugar
              donde pertenecer y un propósito que alcanzar.
            </p>
          </div>

          <div ref={ref4} className="reveal" style={{ flex: '1 1 300px' }}>
            <img
              src="/foto-pastor.jpg"
              alt="Pastor predicando en Águilas CFC"
              style={{
                width: '100%',
                borderRadius: '16px',
                objectFit: 'cover',
                maxHeight: '400px',
              }}
            />
          </div>
        </div>

        {/* Foto adoración + Visión y Misión */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          alignItems: 'center',
        }}>
          <div ref={ref2} className="reveal" style={{ flex: '1 1 300px' }}>
            <img
              src="/foto-adoracion.jpg"
              alt="Tiempo de adoración en Águilas CFC"
              style={{
                width: '100%',
                borderRadius: '16px',
                objectFit: 'cover',
                maxHeight: '400px',
              }}
            />
          </div>

          <div ref={ref3} className="reveal" style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
            <div style={{
              padding: '2rem',
              borderRadius: '12px',
              borderLeft: '4px solid var(--verde)',
              backgroundColor: 'rgba(61, 220, 4, 0.05)',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '900',
                fontSize: '1.5rem',
                color: 'var(--verde)',
                marginBottom: '0.25rem',
              }}>◎</p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '700',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--verde)',
                marginBottom: '1rem',
              }}>Visión</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--texto)',
                lineHeight: '1.8',
              }}>
                Ser una comunidad que conoce profundamente a Dios, vive en libertad
                y descubre su propósito e identidad — haciendo la diferencia y
                dejando huella en el mundo.
              </p>
            </div>

            <div style={{
              padding: '2rem',
              borderRadius: '12px',
              borderLeft: '4px solid var(--verde)',
              backgroundColor: 'rgba(61, 220, 4, 0.05)',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '900',
                fontSize: '1.5rem',
                color: 'var(--verde)',
                marginBottom: '0.25rem',
              }}>◉</p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '700',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--verde)',
                marginBottom: '1rem',
              }}>Misión</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--texto)',
                lineHeight: '1.8',
              }}>
                Acercamos personas a Dios y formamos discípulos que sean líderes
                de impacto e influencia en su sociedad.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Nosotros
import useSyncedRotation from '../hooks/useSyncedRotation'

const fotos = ['/foto-pastor.jpg', '/foto-adoracion.jpg']
const INTERVALO_FOTOS = 5000

function Nosotros() {
  const fotoActual = useSyncedRotation(fotos.length, INTERVALO_FOTOS)

  return (
    <section id="nosotros" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(3rem, 10vw, 8rem) 2rem',
      borderTop: '1px solid var(--borde)',
      color: '#ffffff',
    }}>

      {/* Fondo con fade, igual que el Hero */}
      {fotos.map((foto, i) => (
        <div
          key={foto}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === fotoActual ? 1 : 0,
            transition: 'opacity 1.2s ease',
            zIndex: 0,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'stretch',
        }}>

          {/* Texto */}
          <div className="glass nosotros-card" style={{ flex: '1 1 340px', borderRadius: '20px' }}>
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
              color: '#ffffff',
              lineHeight: '1.15',
            }}>
              No somos una iglesia de eventos. Somos una familia.
            </h2>
            <p className="nosotros-card__body" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.9',
            }}>
              Somos una iglesia que cree y vive de acuerdo a la Palabra de Dios.
              Queremos que cada persona descubra que no está sola, que tiene un lugar
              donde pertenecer y un propósito que alcanzar.
            </p>
          </div>

          {/* Visión y Misión */}
          <div style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <div className="glass nosotros-card" style={{ borderRadius: '20px', flex: 1 }}>
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
              <p className="nosotros-card__body" style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: '1.8',
              }}>
                Ser una comunidad que conoce profundamente a Dios, vive en libertad
                y descubre su propósito e identidad — haciendo la diferencia y
                dejando huella en el mundo.
              </p>
            </div>

            <div className="glass nosotros-card" style={{ borderRadius: '20px', flex: 1 }}>
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
              <p className="nosotros-card__body" style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.85)',
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

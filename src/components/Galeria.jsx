import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import useReveal from '../hooks/useReveal'
import useSyncedRotation from '../hooks/useSyncedRotation'

// Se usa mientras el admin no haya subido fotos propias a Firestore
// (colección "galeria"), para que la sección nunca se vea vacía.
const FOTOS_FALLBACK = [
  '/galeria-1.webp',
  '/galeria-2.webp',
  '/galeria-3.webp',
  '/galeria-4.webp',
  '/galeria-5.webp',
  '/galeria-6.webp',
]

const INTERVALO_FOTOS = 5000

function useFotosGaleria() {
  const [fotosFirestore, setFotosFirestore] = useState(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'galeria'), (snapshot) => {
      const docs = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((d) => (d.seccion || 'principal') === 'principal')
      docs.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      setFotosFirestore(docs.map((d) => d.imagenUrl))
    })
    return () => unsubscribe()
  }, [])

  return fotosFirestore && fotosFirestore.length > 0 ? fotosFirestore : FOTOS_FALLBACK
}

function Galeria() {
  const refTitulo = useReveal()
  const fotos = useFotosGaleria()
  const sincronizado = useSyncedRotation(fotos.length, INTERVALO_FOTOS)
  const [manual, setManual] = useState(null)
  const [prevSincronizado, setPrevSincronizado] = useState(sincronizado)
  if (sincronizado !== prevSincronizado) {
    setPrevSincronizado(sincronizado)
    setManual(null)
  }
  const actual = manual ?? sincronizado

  const anterior = () => setManual((actual - 1 + fotos.length) % fotos.length)
  const siguiente = () => setManual((actual + 1) % fotos.length)

  return (
    <section id="galeria" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(2.5rem, 8vw, 6rem) 2rem clamp(1.5rem, 4vw, 3rem)',
      borderTop: '1px solid var(--borde)',
    }}>

      {/* Fondo ambiental: la misma foto actual, difuminada, dando contexto de color */}
      {fotos.map((foto, i) => (
        <div
          key={foto}
          style={{
            position: 'absolute',
            top: '-5%', left: '-5%',
            width: '110%', height: '110%',
            backgroundImage: `url(${foto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(50px) saturate(130%)',
            opacity: i === actual ? 0.55 : 0,
            transition: 'opacity 1s ease',
            zIndex: 0,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 1,
      }} />

      <div ref={refTitulo} className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
        <p style={{
          color: 'var(--verde)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Nuestra comunidad
        </p>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '900',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#ffffff',
        }}>
          Momentos que nos definen
        </h2>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>

        <div style={{
          borderRadius: '18px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          position: 'relative',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)',
        }}>
            {fotos.map((foto, i) => (
              <img
                key={foto}
                src={foto}
                alt={`Momento Aguilas CFC ${i + 1}`}
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === actual ? 1 : 0,
                  transition: 'opacity 0.8s ease',
                }}
              />
            ))}

            {/* Botones */}
            <button
              aria-label="Foto anterior"
              onClick={anterior}
              className="galeria-glass-btn"
              style={{
                position: 'absolute', left: '1rem', top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px',
                borderRadius: '50%', cursor: 'pointer', zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              &#8249;
            </button>
            <button
              aria-label="Foto siguiente"
              onClick={siguiente}
              className="galeria-glass-btn"
              style={{
                position: 'absolute', right: '1rem', top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff', fontSize: '1.5rem', width: '44px', height: '44px',
                borderRadius: '50%', cursor: 'pointer', zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              &#8250;
            </button>
        </div>

        {/* Miniaturas */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {fotos.map((foto, i) => (
            <button
              key={foto}
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setManual(i)}
              style={{
                width: '60px',
                height: '44px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: i === actual ? '2px solid var(--verde)' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
                flexShrink: 0,
              }}
            >
              <img
                src={foto}
                alt={`Miniatura ${i + 1}`}
                width="60"
                height="44"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Galeria

import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import useReveal from '../hooks/useReveal'

function TarjetaAnuncio({ anuncio }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="reveal" style={{
      border: '1px solid var(--borde)',
      borderRadius: '16px',
      padding: '1.5rem',
      display: 'flex',
      gap: '1.25rem',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '0 auto 1.5rem auto',
      backgroundColor: 'var(--fondo)',
    }}>
      {anuncio.imagenUrl && (
        <img
          src={anuncio.imagenUrl}
          alt={anuncio.titulo}
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
        />
      )}
      <div>
        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: 'var(--texto)', marginBottom: '0.35rem' }}>
          {anuncio.titulo}
        </h3>
        {anuncio.texto && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--texto-suave)', lineHeight: '1.6', margin: 0 }}>
            {anuncio.texto}
          </p>
        )}
      </div>
    </div>
  )
}

function estaVigente(anuncio) {
  if (!anuncio.fechaExpiracion) return true
  const hoy = new Date()
  const expiracion = new Date(anuncio.fechaExpiracion + 'T23:59:59')
  return expiracion >= hoy
}

function Anuncios() {
  const [anuncios, setAnuncios] = useState([])
  const refTitulo = useReveal()

  useEffect(() => {
    const q = query(collection(db, 'anuncios'), orderBy('creado', 'desc'))
    const unsubscribe = onSnapshot(q, function (snapshot) {
      setAnuncios(snapshot.docs.map(function (d) {
        return { id: d.id, ...d.data() }
      }))
    })
    return () => unsubscribe()
  }, [])

  const anunciosVigentes = anuncios.filter(estaVigente)

  if (anunciosVigentes.length === 0) return null

  return (
    <section style={{ backgroundColor: 'var(--fondo)', padding: '5rem 2rem', borderTop: '1px solid var(--borde)' }}>
      <div ref={refTitulo} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ color: 'var(--verde)', fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Mantente informado
        </p>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--texto)' }}>
          Anuncios
        </h2>
      </div>

      {anunciosVigentes.map(function (anuncio) {
        return <TarjetaAnuncio key={anuncio.id} anuncio={anuncio} />
      })}
    </section>
  )
}

export default Anuncios
import { useEffect, useState } from 'react'
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { usePortalAuth } from './PortalAuthContext'
import './portal.css'

export default function AvisosBanner() {
  const { userData, user } = usePortalAuth()
  const [avisos, setAvisos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [texto, setTexto] = useState('')
  const [publicando, setPublicando] = useState(false)

  async function cargarAvisos() {
    try {
      const q = query(
        collection(db, 'avisos_portal'),
        where('activo', '==', true),
        orderBy('createdAt', 'desc')
      )
      const snap = await getDocs(q)
      setAvisos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.warn('No se pudieron cargar los avisos:', err)
    }
    setCargando(false)
  }

  useEffect(() => { cargarAvisos() }, [])

  async function handlePublicar(e) {
    e.preventDefault()
    if (!texto.trim()) return
    setPublicando(true)
    try {
      await addDoc(collection(db, 'avisos_portal'), {
        texto: texto.trim(),
        activo: true,
        creadoPor: userData?.nombre || user?.email,
        createdAt: serverTimestamp(),
      })
      setTexto('')
      setMostrarForm(false)
      await cargarAvisos()
    } catch (err) {
      console.error(err)
    }
    setPublicando(false)
  }

  async function handleCerrar(id) {
    try {
      await updateDoc(doc(db, 'avisos_portal', id), { activo: false })
      setAvisos((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (cargando) return null

  return (
    <div style={{ marginBottom: '20px' }}>
      {avisos.map((aviso) => (
        <div key={aviso.id} className="portal-fade-in" style={styles.aviso}>
          <p style={styles.avisoTexto}>{aviso.texto}</p>
          <button onClick={() => handleCerrar(aviso.id)} style={styles.avisoCerrar}>×</button>
        </div>
      ))}

      {!mostrarForm ? (
        <button onClick={() => setMostrarForm(true)} style={styles.botonNuevoAviso}>
          + Publicar aviso
        </button>
      ) : (
        <form onSubmit={handlePublicar} style={styles.formAviso}>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Ej. La reunión del martes cambia de horario..."
            style={styles.inputAviso}
            autoFocus
          />
          <button type="submit" disabled={publicando} style={styles.botonPublicar}>
            {publicando ? 'Publicando...' : 'Publicar'}
          </button>
          <button type="button" onClick={() => setMostrarForm(false)} style={styles.botonCancelarAviso}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}

const styles = {
  aviso: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', borderRadius: '10px', background: 'rgba(61,220,4,0.12)',
    border: '1px solid #3DDC04', marginBottom: '8px',
  },
  avisoTexto: { margin: 0, fontSize: '14px', color: 'var(--portal-text)', fontWeight: 500 },
  avisoCerrar: {
    background: 'none', border: 'none', fontSize: '18px', color: 'var(--portal-muted)',
    cursor: 'pointer', lineHeight: 1, padding: '0 4px',
  },
  botonNuevoAviso: {
    padding: '8px 14px', borderRadius: '8px', border: '1px dashed var(--portal-card-border)',
    background: 'transparent', color: 'var(--portal-muted)', fontSize: '13px', cursor: 'pointer',
  },
  formAviso: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  inputAviso: {
    flex: '1 1 260px', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--portal-input-border)',
    background: 'var(--portal-input-bg)', color: 'var(--portal-input-text)', fontSize: '14px', fontFamily: 'Inter, sans-serif',
  },
  botonPublicar: {
    padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#3DDC04',
    color: '#0F0F12', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
  },
  botonCancelarAviso: {
    padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--portal-button-secondary-border)',
    background: 'var(--portal-button-secondary-bg)', color: 'var(--portal-text)', fontSize: '14px', cursor: 'pointer',
  },
}
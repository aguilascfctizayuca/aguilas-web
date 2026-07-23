import { useState, useEffect } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider, db, storage } from '../firebase'
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, orderBy, query, serverTimestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import imageCompression from 'browser-image-compression'

const CORREO_AUTORIZADO = 'schottalfredo@gmail.com'
const VERDE = '#3DDC04'
const VERDE_HOVER = '#2BAF1E'
const FONDO = '#0B0F0A'
const CARD = '#131813'
const BORDE = '#232823'
const TEXTO = '#F2F2ED'
const TEXTO_SUAVE = '#9A9F98'

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  marginTop: '0.4rem',
  backgroundColor: '#1A1F19',
  border: `1px solid ${BORDE}`,
  borderRadius: '10px',
  color: TEXTO,
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: TEXTO_SUAVE,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const tabStyle = (activo) => ({
  padding: '0.6rem 1.4rem',
  borderRadius: '999px',
  border: `1px solid ${activo ? VERDE : BORDE}`,
  backgroundColor: activo ? VERDE : 'transparent',
  color: activo ? '#000' : TEXTO_SUAVE,
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: '700',
  fontSize: '0.85rem',
  cursor: 'pointer',
})

async function subirImagenComprimida(archivo, carpeta) {
  const opciones = { maxSizeMB: 0.5, maxWidthOrHeight: 1600, useWebWorker: true }
  const comprimido = await imageCompression(archivo, opciones)
  const nombreArchivo = `${carpeta}/${Date.now()}-${archivo.name}`
  const storageRef = ref(storage, nombreArchivo)
  await uploadBytes(storageRef, comprimido)
  return getDownloadURL(storageRef)
}

function borrarImagenDeStorage(url) {
  if (!url) return
  try {
    const path = decodeURIComponent(url.split('/o/')[1].split('?')[0])
    deleteObject(ref(storage, path)).catch(() => {})
  } catch (e) {}
}

function Admin() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [tab, setTab] = useState('anuncios')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
      setCargando(false)
    })
    return () => unsubscribe()
  }, [])

  const entrar = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  const salir = () => signOut(auth)

  if (cargando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: FONDO, color: TEXTO_SUAVE, fontFamily: 'Inter, sans-serif' }}>
        Cargando...
      </div>
    )
  }

  if (!usuario) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: FONDO, fontFamily: 'Inter, sans-serif', gap: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', color: TEXTO, fontSize: '1.8rem' }}>
          Panel de administración
        </h1>
        <button
          onClick={entrar}
          style={{ backgroundColor: VERDE, color: '#000', fontWeight: '700', border: 'none', padding: '1rem 2rem', borderRadius: '999px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'Montserrat, sans-serif', transition: 'background-color 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = VERDE_HOVER}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = VERDE}
        >
          Entrar con Google
        </button>
      </div>
    )
  }

  if (usuario.email !== CORREO_AUTORIZADO) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: FONDO, fontFamily: 'Inter, sans-serif', gap: '1rem', color: TEXTO }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif' }}>Sin acceso</h2>
        <p style={{ color: TEXTO_SUAVE }}>Esta cuenta no tiene permiso para entrar al panel.</p>
        <button onClick={salir} style={{ cursor: 'pointer', background: 'none', border: `1px solid ${BORDE}`, color: TEXTO, padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: FONDO, fontFamily: 'Inter, sans-serif', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', color: TEXTO, fontSize: '1.6rem', margin: 0 }}>
            Panel de administración
          </h1>
          <button onClick={salir} style={{ cursor: 'pointer', background: 'none', border: `1px solid ${BORDE}`, color: TEXTO_SUAVE, padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
            Cerrar sesión
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <button style={tabStyle(tab === 'anuncios')} onClick={() => setTab('anuncios')}>Anuncios</button>
          <button style={tabStyle(tab === 'eventos')} onClick={() => setTab('eventos')}>Eventos</button>
        </div>

        {tab === 'anuncios' ? <PanelAnuncios /> : <PanelEventos />}
      </div>
    </div>
  )
}

function PanelAnuncios() {
  const [anuncios, setAnuncios] = useState([])
  const [editando, setEditando] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [form, setForm] = useState({ titulo: '', texto: '', fechaExpiracion: '', imagenFile: null, imagenUrlActual: '' })

  useEffect(() => {
    const q = query(collection(db, 'anuncios'), orderBy('creado', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnuncios(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsubscribe()
  }, [])

  const resetForm = () => {
    setForm({ titulo: '', texto: '', fechaExpiracion: '', imagenFile: null, imagenUrlActual: '' })
    setEditando(null)
  }

  const guardar = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setSubiendo(true)
    try {
      let imagenUrl = form.imagenUrlActual || ''
      if (form.imagenFile) {
        imagenUrl = await subirImagenComprimida(form.imagenFile, 'anuncios')
      }
      const datos = { titulo: form.titulo, texto: form.texto, fechaExpiracion: form.fechaExpiracion || null, imagenUrl }
      if (editando) {
        await updateDoc(doc(db, 'anuncios', editando), datos)
      } else {
        await addDoc(collection(db, 'anuncios'), { ...datos, creado: serverTimestamp() })
      }
      resetForm()
    } catch (error) {
      console.error(error)
      alert('Hubo un error al guardar.')
    } finally {
      setSubiendo(false)
    }
  }

  const editar = (a) => {
    setForm({ titulo: a.titulo || '', texto: a.texto || '', fechaExpiracion: a.fechaExpiracion || '', imagenFile: null, imagenUrlActual: a.imagenUrl || '' })
    setEditando(a.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const borrar = async (a) => {
    if (!confirm(`¿Borrar "${a.titulo}"?`)) return
    borrarImagenDeStorage(a.imagenUrl)
    await deleteDoc(doc(db, 'anuncios', a.id))
  }

  return (
    <>
      <h2 style={{ fontFamily: 'Montserrat, sans-serif', color: TEXTO, fontSize: '1.1rem', marginBottom: '1rem' }}>Anuncios</h2>

      <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: CARD, border: `1px solid ${BORDE}`, borderRadius: '16px', padding: '1.75rem', marginBottom: '2.5rem' }}>
        <label style={labelStyle}>
          Título
          <input type="text" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} style={inputStyle} placeholder="Ej. Servicio especial de oración" />
        </label>
        <label style={labelStyle}>
          Texto
          <textarea value={form.texto} onChange={e => setForm({ ...form, texto: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Detalles del anuncio..." />
        </label>
        <label style={labelStyle}>
          Imagen (opcional)
          <input type="file" accept="image/*" onChange={e => setForm({ ...form, imagenFile: e.target.files[0] })} style={{ display: 'block', marginTop: '0.5rem', color: TEXTO_SUAVE, fontSize: '0.85rem' }} />
        </label>
        {form.imagenUrlActual && !form.imagenFile && (
          <img src={form.imagenUrlActual} alt="actual" style={{ maxWidth: '140px', borderRadius: '10px', border: `1px solid ${BORDE}` }} />
        )}
        <label style={labelStyle}>
          Fecha de expiración (opcional)
          <input type="date" value={form.fechaExpiracion} onChange={e => setForm({ ...form, fechaExpiracion: e.target.value })} style={{ ...inputStyle, colorScheme: 'dark', maxWidth: '200px' }} />
          <span style={{ display: 'block', fontSize: '0.75rem', color: TEXTO_SUAVE, textTransform: 'none', letterSpacing: 'normal', marginTop: '0.35rem', fontWeight: '400' }}>
            Se oculta solo del sitio después de esta fecha
          </span>
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="submit" disabled={subiendo} style={{ backgroundColor: subiendo ? BORDE : VERDE, color: subiendo ? TEXTO_SUAVE : '#000', border: 'none', padding: '0.85rem 1.75rem', borderRadius: '999px', cursor: subiendo ? 'default' : 'pointer', fontWeight: '700', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}>
            {subiendo ? 'Guardando...' : editando ? 'Actualizar anuncio' : 'Crear anuncio'}
          </button>
          {editando && (
            <button type="button" onClick={resetForm} style={{ background: 'none', border: `1px solid ${BORDE}`, color: TEXTO_SUAVE, padding: '0.85rem 1.5rem', borderRadius: '999px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {anuncios.map(a => (
          <div key={a.id} style={{ border: `1px solid ${BORDE}`, backgroundColor: CARD, borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {a.imagenUrl && <img src={a.imagenUrl} alt={a.titulo} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ color: TEXTO, fontFamily: 'Montserrat, sans-serif', fontSize: '0.95rem' }}>{a.titulo}</strong>
              <p style={{ margin: '0.3rem 0', fontSize: '0.85rem', color: TEXTO_SUAVE }}>{a.texto}</p>
              {a.fechaExpiracion && <span style={{ fontSize: '0.75rem', color: VERDE }}>Expira: {a.fechaExpiracion}</span>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => editar(a)} style={{ cursor: 'pointer', background: 'none', border: `1px solid ${BORDE}`, color: TEXTO, padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem' }}>Editar</button>
              <button onClick={() => borrar(a)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #4A1B0C', color: '#F0997B', padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem' }}>Borrar</button>
            </div>
          </div>
        ))}
        {anuncios.length === 0 && <p style={{ color: TEXTO_SUAVE, fontSize: '0.9rem' }}>Aún no hay anuncios.</p>}
      </div>
    </>
  )
}

const formEventoVacio = {
  titulo: '', descripcion: '', fecha: '', hora: '', ubicacion: '',
  whatsappMensaje: '', mostrarContador: false, imagenFile: null, imagenUrlActual: '',
}

function PanelEventos() {
  const [eventos, setEventos] = useState([])
  const [editando, setEditando] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [form, setForm] = useState(formEventoVacio)

  useEffect(() => {
    const q = query(collection(db, 'eventos'), orderBy('creado', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEventos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsubscribe()
  }, [])

  const resetForm = () => {
    setForm(formEventoVacio)
    setEditando(null)
  }

  const guardar = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setSubiendo(true)
    try {
      let imagenUrl = form.imagenUrlActual || ''
      if (form.imagenFile) {
        imagenUrl = await subirImagenComprimida(form.imagenFile, 'eventos')
      }
      const datos = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        fecha: form.fecha || null,
        hora: form.hora || null,
        ubicacion: form.ubicacion || null,
        whatsappMensaje: form.whatsappMensaje || ('Quisiera información sobre el evento: ' + form.titulo),
        mostrarContador: !!form.mostrarContador,
        imagenUrl,
      }
      if (editando) {
        await updateDoc(doc(db, 'eventos', editando), datos)
      } else {
        await addDoc(collection(db, 'eventos'), { ...datos, creado: serverTimestamp() })
      }
      resetForm()
    } catch (error) {
      console.error(error)
      alert('Hubo un error al guardar.')
    } finally {
      setSubiendo(false)
    }
  }

  const editar = (ev) => {
    setForm({
      titulo: ev.titulo || '',
      descripcion: ev.descripcion || '',
      fecha: ev.fecha || '',
      hora: ev.hora || '',
      ubicacion: ev.ubicacion || '',
      whatsappMensaje: ev.whatsappMensaje || '',
      mostrarContador: !!ev.mostrarContador,
      imagenFile: null,
      imagenUrlActual: ev.imagenUrl || '',
    })
    setEditando(ev.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const borrar = async (ev) => {
    if (!confirm(`¿Borrar el evento "${ev.titulo}"?`)) return
    borrarImagenDeStorage(ev.imagenUrl)
    await deleteDoc(doc(db, 'eventos', ev.id))
  }

  return (
    <>
      <h2 style={{ fontFamily: 'Montserrat, sans-serif', color: TEXTO, fontSize: '1.1rem', marginBottom: '1rem' }}>Eventos</h2>

      <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: CARD, border: `1px solid ${BORDE}`, borderRadius: '16px', padding: '1.75rem', marginBottom: '2.5rem' }}>
        <label style={labelStyle}>
          Título
          <input type="text" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} style={inputStyle} placeholder="Ej. Aún hay más" />
        </label>
        <label style={labelStyle}>
          Descripción
          <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Detalles del evento..." />
        </label>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <label style={{ ...labelStyle, flex: 1, minWidth: '140px' }}>
            Fecha (opcional)
            <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} style={{ ...inputStyle, colorScheme: 'dark' }} />
          </label>
          <label style={{ ...labelStyle, flex: 1, minWidth: '140px' }}>
            Hora (opcional)
            <input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} style={{ ...inputStyle, colorScheme: 'dark' }} />
          </label>
        </div>

        <label style={labelStyle}>
          Ubicación (opcional)
          <input type="text" value={form.ubicacion} onChange={e => setForm({ ...form, ubicacion: e.target.value })} style={inputStyle} placeholder="Ej. Jardín las Flores, Tizayuca" />
        </label>

        <label style={labelStyle}>
          Imagen / flyer (opcional)
          <input type="file" accept="image/*" onChange={e => setForm({ ...form, imagenFile: e.target.files[0] })} style={{ display: 'block', marginTop: '0.5rem', color: TEXTO_SUAVE, fontSize: '0.85rem' }} />
        </label>
        {form.imagenUrlActual && !form.imagenFile && (
          <img src={form.imagenUrlActual} alt="actual" style={{ maxWidth: '140px', borderRadius: '10px', border: `1px solid ${BORDE}` }} />
        )}

        <label style={labelStyle}>
          Mensaje de WhatsApp (opcional)
          <input type="text" value={form.whatsappMensaje} onChange={e => setForm({ ...form, whatsappMensaje: e.target.value })} style={inputStyle} placeholder="Ej. Quisiera info del evento X" />
          <span style={{ display: 'block', fontSize: '0.75rem', color: TEXTO_SUAVE, textTransform: 'none', letterSpacing: 'normal', marginTop: '0.35rem', fontWeight: '400' }}>
            Si lo dejas vacío, no se muestra botón de WhatsApp en este evento
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.mostrarContador} onChange={e => setForm({ ...form, mostrarContador: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: VERDE }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: TEXTO }}>Mostrar contador regresivo para este evento</span>
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="submit" disabled={subiendo} style={{ backgroundColor: subiendo ? BORDE : VERDE, color: subiendo ? TEXTO_SUAVE : '#000', border: 'none', padding: '0.85rem 1.75rem', borderRadius: '999px', cursor: subiendo ? 'default' : 'pointer', fontWeight: '700', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}>
            {subiendo ? 'Guardando...' : editando ? 'Actualizar evento' : 'Crear evento'}
          </button>
          {editando && (
            <button type="button" onClick={resetForm} style={{ background: 'none', border: `1px solid ${BORDE}`, color: TEXTO_SUAVE, padding: '0.85rem 1.5rem', borderRadius: '999px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {eventos.map(ev => (
          <div key={ev.id} style={{ border: `1px solid ${BORDE}`, backgroundColor: CARD, borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {ev.imagenUrl && <img src={ev.imagenUrl} alt={ev.titulo} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ color: TEXTO, fontFamily: 'Montserrat, sans-serif', fontSize: '0.95rem' }}>{ev.titulo}</strong>
              <p style={{ margin: '0.3rem 0', fontSize: '0.85rem', color: TEXTO_SUAVE }}>{ev.descripcion}</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {ev.fecha && <span style={{ fontSize: '0.75rem', color: VERDE }}>{ev.fecha}{ev.hora ? ` · ${ev.hora}` : ''}</span>}
                {ev.ubicacion && <span style={{ fontSize: '0.75rem', color: TEXTO_SUAVE }}>{ev.ubicacion}</span>}
                {ev.mostrarContador && <span style={{ fontSize: '0.75rem', color: VERDE }}>Contador activo</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => editar(ev)} style={{ cursor: 'pointer', background: 'none', border: `1px solid ${BORDE}`, color: TEXTO, padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem' }}>Editar</button>
              <button onClick={() => borrar(ev)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #4A1B0C', color: '#F0997B', padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem' }}>Borrar</button>
            </div>
          </div>
        ))}
        {eventos.length === 0 && <p style={{ color: TEXTO_SUAVE, fontSize: '0.9rem' }}>Aún no hay eventos.</p>}
      </div>
    </>
  )
}

export default Admin
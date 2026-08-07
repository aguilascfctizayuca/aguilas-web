import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, updateDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { usePortalAuth } from './PortalAuthContext'
import './portal.css'

export default function NuevoEvento() {
  const navigate = useNavigate()
  const { userData, user } = usePortalAuth()

  const [ministerios, setMinisterios] = useState([])
  const [cargandoMinisterios, setCargandoMinisterios] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    ubicacion: '',
    responsable: '',
    ministerioOrganizador: '',
    ministeriosRequeridos: [],
  })

  useEffect(() => {
    async function cargarMinisterios() {
      const snap = await getDocs(collection(db, 'ministerios'))
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre))
      setMinisterios(lista)
      setCargandoMinisterios(false)
    }
    cargarMinisterios()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleMinisterioRequerido(id) {
    setForm((prev) => {
      const yaEsta = prev.ministeriosRequeridos.includes(id)
      return {
        ...prev,
        ministeriosRequeridos: yaEsta
          ? prev.ministeriosRequeridos.filter((m) => m !== id)
          : [...prev.ministeriosRequeridos, id],
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!form.titulo || !form.fecha || !form.horaInicio || !form.ministerioOrganizador) {
      setError('Título, fecha, hora de inicio y ministerio organizador son obligatorios.')
      return
    }

    setGuardando(true)
    try {
      const docRef = await addDoc(collection(db, 'eventos_internos'), {
        ...form,
        estado: 'pendiente',
        googleEventId: null,
        creadoPor: user.email,
        creadoPorNombre: userData?.nombre || user.email,
        createdAt: serverTimestamp(),
      })

      // Intentar crear el evento también en Google Calendar.
      // Si esto falla, el evento ya quedó guardado en Firestore de todos modos —
      // no queremos que un problema con Calendar impida guardar el evento.
      try {
        const respuesta = await fetch('/api/crear-evento-calendario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: form.titulo,
            descripcion: form.descripcion,
            fecha: form.fecha,
            horaInicio: form.horaInicio,
            horaFin: form.horaFin,
            ubicacion: form.ubicacion,
          }),
        })

        if (respuesta.ok) {
          const data = await respuesta.json()
          await updateDoc(docRef, { googleEventId: data.googleEventId })
        } else {
          console.warn('No se pudo sincronizar con Google Calendar, pero el evento sí se guardó.')
        }
      } catch (calendarErr) {
        console.warn('Error de red al sincronizar con Google Calendar:', calendarErr)
      }

      navigate('/lideres/dashboard')
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar el evento. Intenta de nuevo.')
      setGuardando(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Nuevo evento</h1>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Título *
            <input name="titulo" value={form.titulo} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.label}>
            Descripción
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} style={{ ...styles.input, minHeight: '80px' }} />
          </label>

          <div style={styles.row}>
            <label style={styles.label}>
              Fecha *
              <input type="date" name="fecha" value={form.fecha} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Hora inicio *
              <input type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Hora fin
              <input type="time" name="horaFin" value={form.horaFin} onChange={handleChange} style={styles.input} />
            </label>
          </div>

          <label style={styles.label}>
            Ubicación
            <input name="ubicacion" value={form.ubicacion} onChange={handleChange} style={styles.input} placeholder="Ej. Templo principal" />
          </label>

          <label style={styles.label}>
            Responsable
            <input name="responsable" value={form.responsable} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.label}>
            Ministerio organizador *
            <select name="ministerioOrganizador" value={form.ministerioOrganizador} onChange={handleChange} style={styles.input}>
              <option value="">Selecciona uno</option>
              {ministerios.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </label>

          <div style={styles.label}>
            Ministerios requeridos
            {cargandoMinisterios ? (
              <p style={{ color: 'var(--portal-muted-2)' }}>Cargando...</p>
            ) : (
              <div style={styles.checklist}>
                {ministerios.map((m) => (
                  <label key={m.id} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={form.ministeriosRequeridos.includes(m.id)}
                      onChange={() => toggleMinisterioRequerido(m.id)}
                    />
                    <span style={{ ...styles.colorDot, background: m.color }} />
                    {m.nombre}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={guardando} style={styles.button}>
            {guardando ? 'Guardando...' : 'Crear evento'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--portal-bg)', padding: '32px 20px' },
  container: { maxWidth: '640px', margin: '0 auto', fontFamily: 'Inter, sans-serif' },
  title: { fontFamily: 'Montserrat, sans-serif', fontWeight: 900, marginBottom: '24px', color: 'var(--portal-text)' },
  error: { color: 'var(--portal-error-text)', background: 'var(--portal-error-bg)', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  label: { display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, fontSize: '14px', color: 'var(--portal-label-text)' },
  input: {
    padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--portal-input-border)', fontSize: '15px',
    fontFamily: 'Inter, sans-serif', background: 'var(--portal-input-bg)', color: 'var(--portal-input-text)',
  },
  row: { display: 'flex', gap: '12px' },
  checklist: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 400, fontSize: '14px', color: 'var(--portal-text)' },
  colorDot: { width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block' },
  button: {
    padding: '14px 24px', borderRadius: '10px', border: 'none', background: '#3DDC04',
    color: '#0F0F12', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginTop: '8px',
  },
}
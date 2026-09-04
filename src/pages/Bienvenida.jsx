import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { ArrowLeft, ArrowRight, Users, Flame } from 'lucide-react'

const HORARIOS = [
  { dia: 'Domingo', hora: '9:45 AM' },
  { dia: 'Domingo', hora: '11:45 AM' },
  { dia: 'Miércoles', hora: '7:00 PM' },
  { dia: 'Lunes · Tabernáculo', hora: '7:30 PM' },
]

function Bienvenida() {
  const [modo, setModo] = useState('elegir')

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bienvenida-page">
      <style>{`
        .bienvenida-page{ min-height:100vh; }
        .bienvenida-fade{ animation: bienvenidaFade 0.45s ease both; }
        @keyframes bienvenidaFade{
          from{ opacity:0; transform: translateY(14px); }
          to{ opacity:1; transform: translateY(0); }
        }
      `}</style>
      <div key={modo} className="bienvenida-fade">
        {modo === 'elegir' && <Elegir onElegir={setModo} />}
        {modo === 'general' && <ModoGeneral onVolver={() => setModo('elegir')} />}
        {modo === 'radgen' && <ModoRadgen onVolver={() => setModo('elegir')} />}
      </div>
    </div>
  )
}

function Elegir({ onElegir }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--fondo)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center',
    }}>
      <img src="/ACFC.webp" alt="Águilas CFC" width="56" height="56" style={{ width: '56px', height: '56px', marginBottom: '1.5rem' }} />
      <p style={{ color: 'var(--verde)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Bienvenido
      </p>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--texto)', marginBottom: '0.75rem' }}>
        ¿A qué viniste hoy?
      </h1>
      <p style={{ color: 'var(--texto-suave)', fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '360px' }}>
        Elige una opción y te mostramos justo lo que buscas.
      </p>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '640px' }}>
        <button onClick={() => onElegir('general')} className="glass-panel" style={{
          width: '260px', padding: '2rem 1.5rem', borderRadius: '20px', cursor: 'pointer',
          border: '1px solid var(--borde-glass)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem',
        }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(61,220,4,0.12)', border: '1.5px solid var(--verde)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} strokeWidth={1.75} color="var(--verde)" />
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'var(--texto)' }}>Vengo al servicio</span>
          <span style={{ color: 'var(--texto-suave)', fontSize: '0.82rem' }}>Horarios, qué esperar y cómo llegar</span>
        </button>

        <button onClick={() => onElegir('radgen')} style={{
          width: '260px', padding: '2rem 1.5rem', borderRadius: '20px', cursor: 'pointer',
          background: '#3a7bff', border: '3px solid #F5F3EE', boxShadow: '8px 8px 0 #0F0F12',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem',
        }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#F5F3EE', border: '2.5px solid #0F0F12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={24} strokeWidth={2} color="#0F0F12" />
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1.05rem', color: '#F5F3EE', textTransform: 'uppercase' }}>Vengo a RadGen</span>
          <span style={{ color: '#EAF0FF', fontSize: '0.82rem', fontWeight: 600 }}>El espacio para jóvenes y adolescentes</span>
        </button>
      </div>

      <Link to="/" style={{ marginTop: '2.5rem', color: 'var(--texto-suave)', fontSize: '0.8rem', textDecoration: 'none' }}>
        ← Ir al sitio principal
      </Link>
    </div>
  )
}

function FormularioVisita({ modo, estiloInput, estiloBoton, textoBoton, colorTexto }) {
  const [form, setForm] = useState({ nombre: '', telefono: '' })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    if (!form.nombre.trim() || !form.telefono.trim()) return
    setEnviando(true)
    try {
      await addDoc(collection(db, 'visitasNuevas'), {
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        modo,
        atendido: false,
        creado: serverTimestamp(),
      })
      setEnviado(true)
    } catch (error) {
      console.error(error)
      alert('Hubo un error al enviar tus datos. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <p style={{ color: colorTexto, fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
        ¡Gracias! Alguien del equipo te va a escribir pronto. 🙌
      </p>
    )
  }

  return (
    <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input type="text" required placeholder="Tu nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} style={estiloInput} />
      <input type="tel" required placeholder="Tu WhatsApp" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} style={estiloInput} />
      <button type="submit" disabled={enviando} style={estiloBoton}>
        {enviando ? 'Enviando...' : textoBoton}
      </button>
    </form>
  )
}

function ModoGeneral({ onVolver }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--fondo)', padding: '2rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <button onClick={onVolver} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--texto-suave)', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '2rem' }}>
          <ArrowLeft size={15} /> Elegir de nuevo
        </button>

        <p style={{ color: 'var(--verde)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Qué bueno verte
        </p>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', color: 'var(--texto)', marginBottom: '1rem' }}>
          ¡Bienvenido a Águilas!
        </h1>
        <p style={{ color: 'var(--texto-suave)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Somos una familia que cree en Jesús, la comunidad y que hay un lugar para ti tal como eres. Aquí tienes lo que necesitas saber.
        </p>

        <div className="glass-panel" style={{ borderRadius: '18px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: 'var(--texto)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Horarios</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {HORARIOS.map((h) => (
              <div key={h.dia + h.hora} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--texto-suave)' }}>{h.dia}</span>
                <span style={{ color: 'var(--texto)', fontWeight: 700 }}>{h.hora}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ borderRadius: '18px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: 'var(--texto)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Qué esperar</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--texto-suave)', fontSize: '0.88rem', lineHeight: 1.9 }}>
            <li>Viste como te sientas cómodo, no hay código de vestimenta.</li>
            <li>El servicio dura aproximadamente 1 hora.</li>
            <li>Tenemos espacio para niños durante el servicio.</li>
            <li>Alguien del equipo de bienvenida te va a recibir en la entrada.</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ borderRadius: '18px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: 'var(--texto)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Déjanos tus datos</h3>
          <FormularioVisita
            modo="general"
            textoBoton="Enviar"
            colorTexto="var(--texto)"
            estiloInput={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--borde)', backgroundColor: 'rgba(255,255,255,0.04)', color: 'var(--texto)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', boxSizing: 'border-box' }}
            estiloBoton={{ backgroundColor: 'var(--verde)', color: '#000', border: 'none', padding: '0.85rem', borderRadius: '999px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', cursor: 'pointer' }}
          />
        </div>

        <a
          href="https://wa.me/527711107903?text=Hola,%20soy%20nuevo%20y%20quiero%20saber%20m%C3%A1s"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', color: 'var(--verde)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
        >
          O escríbenos directo por WhatsApp →
        </a>
      </div>
    </div>
  )
}

function ModoRadgen({ onVolver }) {
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#101014', padding: '2rem 1.5rem 4rem',
      backgroundImage: 'radial-gradient(rgba(245,243,238,0.07) 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
    }}>
      <style>{`
        .bienvenida-radgen h1, .bienvenida-radgen h3{ font-family:'Montserrat',sans-serif; font-weight:900; text-transform:uppercase; color:#F5F3EE; }
        .bienvenida-radgen input{
          width:100%; border:2.5px solid #0F0F12; border-radius:12px; padding:12px 14px;
          font-family:'Inter',sans-serif; font-size:14.5px; font-weight:600; color:#0F0F12;
          background:#fff; box-sizing:border-box;
        }
        .bienvenida-radgen input:focus{ outline:2.5px solid #3a7bff; }
      `}</style>
      <div className="bienvenida-radgen" style={{ maxWidth: '560px', margin: '0 auto' }}>
        <button onClick={onVolver} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#8a8a90', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
          <ArrowLeft size={15} /> Elegir de nuevo
        </button>

        <span style={{
          display: 'inline-block', background: '#FF3B3B', color: '#F5F3EE', border: '3px solid #0F0F12',
          borderRadius: '999px', padding: '8px 18px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase',
          letterSpacing: '0.03em', boxShadow: '4px 4px 0 #F5F3EE', marginBottom: '24px', fontFamily: 'Montserrat, sans-serif',
          transform: 'rotate(-2deg)',
        }}>
          🔥 Ministerio de jóvenes
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 40px)', marginBottom: '16px', lineHeight: 1.05 }}>
          ¡Bienvenido a <span style={{ color: '#8fb4ff' }}>RadGen</span>!
        </h1>
        <p style={{ color: '#C9C8C4', fontSize: '15px', marginBottom: '28px', fontWeight: 500 }}>
          Este es tu espacio: fe real, amigos de verdad y un propósito que vale la pena. Aquí tienes lo básico para empezar.
        </p>

        <div style={{ background: '#F5F3EE', border: '3px solid #0F0F12', borderRadius: '18px', padding: '22px', marginBottom: '18px', boxShadow: '6px 6px 0 #3a7bff' }}>
          <h3 style={{ color: '#0F0F12', fontSize: '13px', marginBottom: '12px' }}>Reuniones</h3>
          <p style={{ color: '#4c4c4c', fontSize: '14px', fontWeight: 600, margin: 0 }}>3 sábados por mes · pregunta al equipo la próxima fecha</p>
        </div>

        <div style={{ background: '#F5F3EE', border: '3px solid #0F0F12', borderRadius: '18px', padding: '22px', marginBottom: '24px', boxShadow: '6px 6px 0 #FF3B3B' }}>
          <h3 style={{ color: '#0F0F12', fontSize: '13px', marginBottom: '12px' }}>Déjanos tus datos</h3>
          <FormularioVisita
            modo="radgen"
            textoBoton="Enviar"
            colorTexto="#0F0F12"
            estiloInput={{}}
            estiloBoton={{
              background: '#3a7bff', color: '#F5F3EE', border: '2.5px solid #0F0F12', borderRadius: '999px',
              padding: '12px', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', fontSize: '13px',
              textTransform: 'uppercase', cursor: 'pointer', boxShadow: '4px 4px 0 #0F0F12',
            }}
          />
        </div>

        <Link to="/radgen" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: '#0F0F12', color: '#F5F3EE', border: '3px solid #F5F3EE', borderRadius: '999px',
          padding: '14px', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '13px',
          textTransform: 'uppercase', textDecoration: 'none', boxShadow: '5px 5px 0 #3a7bff',
        }}>
          Ver todo sobre RadGen <ArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default Bienvenida

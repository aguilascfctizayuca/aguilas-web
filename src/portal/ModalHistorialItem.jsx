// src/portal/ModalHistorialItem.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { X, Clock } from 'lucide-react';
import { db } from '../firebase';

const ETIQUETAS_ACCION = {
  agregó: 'agregó el item',
  editó: 'editó',
  eliminó: 'eliminó el item',
  restauró: 'restauró el item',
  cambió_estado: 'cambió el estado',
};

function formatearFecha(timestamp) {
  if (!timestamp?.toDate) return '';
  const fecha = timestamp.toDate();
  return fecha.toLocaleString('es-MX', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ModalHistorialItem({ itemId, itemNombre, ministerio, onClose }) {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarHistorial();
  }, [itemId]);

  async function cargarHistorial() {
    setCargando(true);
    setError('');
    try {
      const ref = collection(db, 'actividad_inventario');
      const q = query(
        ref,
        where('itemId', '==', itemId),
        where('ministerio', '==', ministerio),
        orderBy('timestamp', 'desc')
      );
      const snap = await getDocs(q);
      setHistorial(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error cargando historial:', err);
      setError('No se pudo cargar el historial.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--portal-text)' }}>Historial</h3>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--portal-muted)' }}>
              {itemNombre}
            </p>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>
            <X size={20} />
          </button>
        </div>

        {cargando ? (
          <p style={{ color: 'var(--portal-muted)' }}>Cargando...</p>
        ) : error ? (
          <p style={errorStyle}>{error}</p>
        ) : historial.length === 0 ? (
          <p style={emptyStyle}>Aún no hay movimientos registrados para este item.</p>
        ) : (
          <ul style={listStyle}>
            {historial.map((h) => (
              <li key={h.id} style={itemStyle}>
                <Clock size={14} color="var(--portal-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, color: 'var(--portal-text)', fontSize: '14px' }}>
                    <strong>{h.quien}</strong> {ETIQUETAS_ACCION[h.accion] || h.accion}
                    {h.detalle ? `: ${h.detalle}` : ''}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--portal-muted)' }}>
                    {formatearFecha(h.timestamp)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '16px',
};

const modalStyle = {
  background: 'var(--portal-card-bg)',
  border: '1px solid var(--portal-card-border)',
  borderRadius: '12px',
  padding: '24px',
  width: '100%',
  maxWidth: '460px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxSizing: 'border-box',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  color: 'var(--portal-muted)',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const itemStyle = {
  display: 'flex',
  gap: '10px',
  paddingBottom: '14px',
  borderBottom: '1px solid var(--portal-card-border)',
};

const errorStyle = {
  color: 'var(--portal-error-text)',
  background: 'var(--portal-error-bg)',
  padding: '10px 14px',
  borderRadius: '8px',
  fontSize: '13px',
};

const emptyStyle = {
  color: 'var(--portal-muted)',
  fontSize: '13px',
  textAlign: 'center',
  padding: '16px 0',
};
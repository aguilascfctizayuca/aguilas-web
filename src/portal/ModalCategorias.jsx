// src/portal/ModalCategorias.jsx
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { X, Plus, Trash2 } from 'lucide-react';
import { db } from '../firebase';

export default function ModalCategorias({ ministerio, onClose }) {
  const [categorias, setCategorias] = useState([]);
  const [nueva, setNueva] = useState('');
  const [conteoUso, setConteoUso] = useState({});
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarCategorias();
  }, [ministerio]);

  async function cargarCategorias() {
    setCargando(true);
    try {
      const ref = doc(db, 'categorias_ministerio', ministerio);
      const snap = await getDoc(ref);
      const lista = snap.exists() ? snap.data().categorias || [] : [];
      setCategorias(lista);

      const itemsRef = collection(db, 'inventario_portal');
      const q = query(itemsRef, where('ministerio', '==', ministerio));
      const itemsSnap = await getDocs(q);
      const conteo = {};
      itemsSnap.forEach((docItem) => {
        const cat = docItem.data().categoria;
        conteo[cat] = (conteo[cat] || 0) + 1;
      });
      setConteoUso(conteo);
    } catch (err) {
      console.error('Error cargando categorías:', err);
      setError('No se pudieron cargar las categorías.');
    } finally {
      setCargando(false);
    }
  }

  async function guardarCategorias(nuevaLista) {
    setGuardando(true);
    setError('');
    try {
      const ref = doc(db, 'categorias_ministerio', ministerio);
      await setDoc(ref, { categorias: nuevaLista }, { merge: true });
      setCategorias(nuevaLista);
    } catch (err) {
      console.error('Error guardando categorías:', err);
      setError('No se pudo guardar. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  }

  function agregarCategoria() {
    const valor = nueva.trim();
    if (!valor) return;
    if (categorias.some((c) => c.toLowerCase() === valor.toLowerCase())) {
      setError('Esa categoría ya existe.');
      return;
    }
    const nuevaLista = [...categorias, valor];
    guardarCategorias(nuevaLista);
    setNueva('');
  }

  function eliminarCategoria(cat) {
    if (conteoUso[cat] > 0) {
      setError(`No puedes eliminar "${cat}" — tiene ${conteoUso[cat]} item(s) asignado(s).`);
      return;
    }
    const nuevaLista = categorias.filter((c) => c !== cat);
    guardarCategorias(nuevaLista);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      agregarCategoria();
    }
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0, color: 'var(--portal-text)' }}>Categorías de inventario</h3>
          <button onClick={onClose} style={closeBtnStyle}>
            <X size={20} />
          </button>
        </div>

        {cargando ? (
          <p style={{ color: 'var(--portal-muted)' }}>Cargando...</p>
        ) : (
          <>
            <div style={inputRowStyle}>
              <input
                type="text"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nueva categoría (ej. Micrófonos)"
                style={inputStyle}
                disabled={guardando}
              />
              <button
                onClick={agregarCategoria}
                style={addBtnStyle}
                disabled={guardando || !nueva.trim()}
              >
                <Plus size={18} />
              </button>
            </div>

            {error && <p style={errorStyle}>{error}</p>}

            <ul style={listStyle}>
              {categorias.length === 0 && (
                <li style={emptyStyle}>Aún no hay categorías. Agrega la primera arriba.</li>
              )}
              {categorias.map((cat) => (
                <li key={cat} style={itemStyle}>
                  <span style={{ color: 'var(--portal-text)' }}>
                    {cat}
                    {conteoUso[cat] > 0 && (
                      <span style={countStyle}> ({conteoUso[cat]} item{conteoUso[cat] > 1 ? 's' : ''})</span>
                    )}
                  </span>
                  <button
                    onClick={() => eliminarCategoria(cat)}
                    style={deleteBtnStyle}
                    disabled={guardando}
                    title={conteoUso[cat] > 0 ? 'No se puede eliminar: tiene items asignados' : 'Eliminar'}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </>
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
};

const modalStyle = {
  background: 'var(--portal-card-bg)',
  border: '1px solid var(--portal-card-border)',
  borderRadius: '12px',
  padding: '24px',
  width: '90%',
  maxWidth: '420px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxSizing: 'border-box',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const inputRowStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '12px',
};

const inputStyle = {
  flex: 1,
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--portal-input-border)',
  background: 'var(--portal-input-bg)',
  color: 'var(--portal-input-text)',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const addBtnStyle = {
  background: 'var(--color-primario, #3DDC04)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '0 14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const errorStyle = {
  color: 'var(--portal-error-text)',
  background: 'var(--portal-error-bg)',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  marginBottom: '10px',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 12px',
  background: 'var(--portal-badge-bg)',
  borderRadius: '8px',
  fontSize: '14px',
};

const countStyle = {
  color: 'var(--portal-muted)',
  fontSize: '12px',
};

const deleteBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--portal-error-text)',
  display: 'flex',
};

const emptyStyle = {
  color: 'var(--portal-muted)',
  fontSize: '13px',
  textAlign: 'center',
  padding: '16px 0',
};
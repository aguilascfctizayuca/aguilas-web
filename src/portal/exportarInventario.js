// src/portal/exportarInventario.js

const ETIQUETAS_ESTADO = {
  bueno: 'Bueno',
  dañado: 'Dañado',
  necesita_reemplazo: 'Necesita reemplazo',
  prestado: 'Prestado',
};

function construirFilas(items, ministerios, incluirMinisterio) {
  return items.map((item) => {
    const fila = {
      Nombre: item.nombre,
      Categoría: item.categoria || '',
      Cantidad: item.cantidad,
      'Cantidad mínima': item.cantidadMinima ?? '',
      Estado: ETIQUETAS_ESTADO[item.estado] || item.estado,
      Ubicación: item.ubicacion || '',
      Código: item.codigo || '',
    };
    if (incluirMinisterio) {
      fila.Ministerio = ministerios[item.ministerio]?.nombre || item.ministerio || '';
    }
    return fila;
  });
}

export async function exportarExcel(items, { ministerios = {}, incluirMinisterio = false, nombreArchivo = 'inventario' } = {}) {
  const XLSX = await import('xlsx');
  const filas = construirFilas(items, ministerios, incluirMinisterio);
  const hoja = XLSX.utils.json_to_sheet(filas);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Inventario');
  XLSX.writeFile(libro, `${nombreArchivo}.xlsx`);
}

export async function exportarPDF(items, { ministerios = {}, incluirMinisterio = false, titulo = 'Inventario', nombreArchivo = 'inventario' } = {}) {
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(16);
  doc.text(titulo, 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, 14, 22);

  const encabezados = incluirMinisterio
    ? ['Nombre', 'Ministerio', 'Categoría', 'Cantidad', 'Mín.', 'Estado', 'Ubicación', 'Código']
    : ['Nombre', 'Categoría', 'Cantidad', 'Mín.', 'Estado', 'Ubicación', 'Código'];

  const filas = items.map((item) => {
    const base = [
      item.nombre,
      item.categoria || '',
      String(item.cantidad),
      item.cantidadMinima != null ? String(item.cantidadMinima) : '',
      ETIQUETAS_ESTADO[item.estado] || item.estado,
      item.ubicacion || '',
      item.codigo || '',
    ];
    if (incluirMinisterio) {
      base.splice(1, 0, ministerios[item.ministerio]?.nombre || item.ministerio || '');
    }
    return base;
  });

  autoTable(doc, {
    head: [encabezados],
    body: filas,
    startY: 28,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [61, 220, 4] },
  });

  doc.save(`${nombreArchivo}.pdf`);
}
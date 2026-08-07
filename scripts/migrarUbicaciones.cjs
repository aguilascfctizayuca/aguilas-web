const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

// Mapa de valores viejos -> nuevos
const REEMPLAZOS = {
  'Templo Principal': 'Águilas CFC Tizayuca',
  'Templo principal': 'Águilas CFC Tizayuca',
}

async function migrar() {
  const snap = await db.collection('eventos_internos').get()

  if (snap.empty) {
    console.log('No hay eventos en eventos_internos.')
    return
  }

  let actualizados = 0
  let sinCambios = 0
  let conEstacionamiento = []

  for (const doc of snap.docs) {
    const data = doc.data()
    const ubicacionActual = data.ubicacion

    if (ubicacionActual && REEMPLAZOS[ubicacionActual]) {
      const nuevaUbicacion = REEMPLAZOS[ubicacionActual]
      await doc.ref.update({ ubicacion: nuevaUbicacion })
      console.log(`✓ "${data.titulo}" — "${ubicacionActual}" → "${nuevaUbicacion}"`)
      actualizados++
    } else if (ubicacionActual === 'Estacionamiento') {
      conEstacionamiento.push(data.titulo)
      sinCambios++
    } else {
      sinCambios++
    }
  }

  console.log(`\nListo. ${actualizados} evento(s) actualizado(s), ${sinCambios} sin cambios.`)

  if (conEstacionamiento.length > 0) {
    console.log('\n⚠️  Estos eventos usan "Estacionamiento", que ya no está en la lista. Revísalos manualmente:')
    conEstacionamiento.forEach((titulo) => console.log(`   - ${titulo}`))
  }

  process.exit(0)
}

migrar().catch((err) => {
  console.error('Error migrando ubicaciones:', err)
  process.exit(1)
})

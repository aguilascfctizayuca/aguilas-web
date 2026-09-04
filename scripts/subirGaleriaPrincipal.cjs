// Sube las 6 fotos de respaldo (public/galeria-1.webp ... galeria-6.webp) a
// Firebase Storage + Firestore, en la sección "principal" de la galería,
// para que queden administrables desde el panel de Admin en vez de vivir
// como fallback fijo en el código.
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')
const serviceAccount = require('../serviceAccountKey.json')

const BUCKET = 'aguilas-cfc-tizayuca.firebasestorage.app'

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: BUCKET,
})

const db = getFirestore()
const bucket = getStorage().bucket()

const ARCHIVOS = [1, 2, 3, 4, 5, 6].map((n) => `galeria-${n}.webp`)

async function subir() {
  let orden = Date.now()

  for (const nombre of ARCHIVOS) {
    const rutaLocal = path.join(__dirname, '..', 'public', nombre)
    if (!fs.existsSync(rutaLocal)) {
      console.warn(`⚠️  No existe ${rutaLocal}, se omite.`)
      continue
    }

    const token = crypto.randomUUID()
    const destino = `galeria/${Date.now()}-${nombre}`

    await bucket.upload(rutaLocal, {
      destination: destino,
      metadata: {
        contentType: 'image/webp',
        metadata: { firebaseStorageDownloadTokens: token },
      },
    })

    const imagenUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(destino)}?alt=media&token=${token}`

    await db.collection('galeria').add({
      imagenUrl,
      seccion: 'principal',
      orden,
      creado: FieldValue.serverTimestamp(),
    })

    console.log(`✓ ${nombre} → ${imagenUrl}`)
    orden += 1
  }

  console.log('Listo.')
  process.exit(0)
}

subir().catch((err) => {
  console.error(err)
  process.exit(1)
})

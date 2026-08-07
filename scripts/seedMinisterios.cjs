const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const ministerios = [
  { id: 'alabanza', nombre: 'Alabanza', color: '#E63946', lideres: 'Edgar y Brenda' },
  { id: 'medios', nombre: 'Medios', color: '#457B9D', lideres: 'Vania' },
  { id: 'consolidacion', nombre: 'Consolidación', color: '#2A9D8F', lideres: 'Ivonne' },
  { id: 'mujeres', nombre: 'Mujeres', color: '#E76F51', lideres: 'Lulu' },
  { id: 'radgen', nombre: 'RadGen (Jóvenes)', color: '#FF3B3B', lideres: 'Sandra Lara' },
  { id: 'ninos', nombre: 'Niños', color: '#F4A261', lideres: 'Sandra Canales' },
  { id: 'ujieres', nombre: 'Ujieres', color: '#8D99AE', lideres: 'Vanessa' },
  { id: 'semilla_esperanza', nombre: 'Semilla de Esperanza', color: '#6A4C93', lideres: 'Lola' },
  { id: 'cocina', nombre: 'Cocina', color: '#EF8354', lideres: 'Pastora Karen' },
  { id: 'intercesion', nombre: 'Intercesión', color: '#3D5A80', lideres: 'Aida' },
]

async function seed() {
  for (const m of ministerios) {
    await db.collection('ministerios').doc(m.id).set(m)
    console.log(`✓ ${m.nombre}`)
  }
  console.log('Listo — 10 ministerios creados.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
import {
  Music2,
  Video,
  HeartHandshake,
  Users,
  Flame,
  Baby,
  DoorOpen,
  Sprout,
  ChefHat,
  Hand,
} from 'lucide-react'

// Fuente única de íconos por ministerio.
// El nombre y color reales siguen viviendo en Firestore (colección `ministerios`),
// esto solo mapea el ID del documento a un ícono visual consistente.
export const ICONOS_MINISTERIO = {
  alabanza: Music2,
  medios: Video,
  consolidacion: HeartHandshake,
  mujeres: Users,
  radgen: Flame,
  ninos: Baby,
  ujieres: DoorOpen,
  semilla_esperanza: Sprout,
  cocina: ChefHat,
  intercesion: Hand,
}

export function IconoMinisterio({ id, size = 14, style = {} }) {
  const Icono = ICONOS_MINISTERIO[id]
  if (!Icono) return null
  return <Icono size={size} style={style} strokeWidth={2.25} />
}

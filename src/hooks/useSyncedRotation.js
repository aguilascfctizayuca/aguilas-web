import { useState, useEffect } from 'react'

// Deriva el índice actual del reloj del sistema, alineado a los límites de intervalMs.
// Así, cualquier componente que use el mismo intervalMs cambia de foto en el mismo instante.
function useSyncedRotation(length, intervalMs = 5000) {
  const [index, setIndex] = useState(() => Math.floor(Date.now() / intervalMs) % length)

  useEffect(() => {
    const calc = () => Math.floor(Date.now() / intervalMs) % length
    let intervalId
    const msToNext = intervalMs - (Date.now() % intervalMs)
    const timeoutId = setTimeout(() => {
      setIndex(calc())
      intervalId = setInterval(() => setIndex(calc()), intervalMs)
    }, msToNext)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [length, intervalMs])

  return index
}

export default useSyncedRotation

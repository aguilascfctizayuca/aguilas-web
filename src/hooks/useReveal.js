import { useEffect, useRef } from 'react'

function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    let timeoutId
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // El blur (backdrop-filter) de las tarjetas glass se activa recién
          // aquí, después de que termina la transición de opacidad/transform
          // del .reveal (700ms). Mezclar backdrop-filter con esa transición
          // deja el vidrio "cortado" a la mitad (bug de Chromium/WebKit).
          timeoutId = setTimeout(() => {
            entry.target.classList.add('reveal-done')
          }, 750)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  return ref
}

export default useReveal
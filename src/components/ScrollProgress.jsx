import { useState, useEffect } from 'react'

function ScrollProgress() {
  const [progreso, setProgreso] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight
      const avance = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0
      setProgreso(avance)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${progreso}%` }} />
}

export default ScrollProgress

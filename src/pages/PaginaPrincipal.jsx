import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Servicios from '../components/Servicios'
import Nosotros from '../components/Nosotros'
import Valores from '../components/Valores'
import Galeria from '../components/Galeria'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import LogoAnimado from '../components/LogoAnimado'
import RedesSociales from '../components/RedesSociales'

function PaginaPrincipal() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(61,220,4,0.08) 0%, transparent 25%, rgba(61,220,4,0.12) 50%, transparent 75%, rgba(61,220,4,0.08) 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <LogoAnimado onComplete={() => setLogoVisible(true)} />
      <Navbar logoVisible={logoVisible} />
      <Hero />
      <Servicios />
      <Nosotros />
      <Valores />
      <Galeria />
      <Contacto />
      <RedesSociales />
      <Footer />
    </>
  )
}

export default PaginaPrincipal
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Nosotros from './components/Nosotros'
import Valores from './components/Valores'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import LogoAnimado from './components/LogoAnimado'
import RedesSociales from './components/RedesSociales'

function App() {
  const [logoVisible, setLogoVisible] = useState(false)

  return (
    <>
      <LogoAnimado onComplete={() => setLogoVisible(true)} />
      <Navbar logoVisible={logoVisible} />
      <Hero />
      <Servicios />
      <Nosotros />
      <Valores />
      <Contacto />
      <RedesSociales />
      <Footer />
    </>
  )
}

export default App
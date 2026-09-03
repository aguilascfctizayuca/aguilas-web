import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProximosEventos from '../components/ProximosEventos'
import Anuncios from '../components/Anuncios'
import Servicios from '../components/Servicios'
import Nosotros from '../components/Nosotros'
import Valores from '../components/Valores'
import Galeria from '../components/Galeria'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import LogoAnimado from '../components/LogoAnimado'
import RedesSociales from '../components/RedesSociales'
import WhatsAppFlotante from '../components/WhatsAppFlotante'
import BotonArriba from '../components/BotonArriba'
import ScrollProgress from '../components/ScrollProgress'

function PaginaPrincipal() {
  const [logoVisible, setLogoVisible] = useState(false)

  return (
    <>
      <ScrollProgress />
      <LogoAnimado onComplete={() => setLogoVisible(true)} />
      <Navbar logoVisible={logoVisible} />
      <Hero />
      <ProximosEventos />
      <Anuncios />
      <Servicios />
      <Nosotros />
      <Valores />
      <Galeria />
      <Contacto />
      <RedesSociales />
      <Footer />
      <WhatsAppFlotante />
      <BotonArriba />
    </>
  )
}

export default PaginaPrincipal
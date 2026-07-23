import { Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
import RadGen from './pages/RadGen'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/radgen" element={<RadGen />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App

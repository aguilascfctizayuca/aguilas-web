import { Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
import RadGen from './pages/RadGen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/radgen" element={<RadGen />} />
    </Routes>
  )
}

export default App
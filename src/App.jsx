import { Routes, Route, Outlet } from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
import RadGen from './pages/RadGen'
import Admin from './pages/Admin'
import { PortalAuthProvider } from './portal/PortalAuthContext'
import PortalLogin from './portal/PortalLogin'
import PortalDashboard from './portal/PortalDashboard'
import NuevoEvento from './portal/NuevoEvento'
import EditarEvento from './portal/EditarEvento'
import PortalCalendario from './portal/PortalCalendario'
import ProtectedRoute from './portal/ProtectedRoute'

function PortalLayout() {
  return (
    <PortalAuthProvider>
      <Outlet />
    </PortalAuthProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/radgen" element={<RadGen />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="/lideres" element={<PortalLayout />}>
        <Route index element={<PortalLogin />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <PortalDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="eventos/nuevo"
          element={
            <ProtectedRoute>
              <NuevoEvento />
            </ProtectedRoute>
          }
        />
        <Route
          path="eventos/:id/editar"
          element={
            <ProtectedRoute>
              <EditarEvento />
            </ProtectedRoute>
          }
        />
        <Route
          path="calendario"
          element={
            <ProtectedRoute>
              <PortalCalendario />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
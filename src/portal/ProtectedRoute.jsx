import { Navigate } from 'react-router-dom'
import { usePortalAuth } from './PortalAuthContext'

export default function ProtectedRoute({ children }) {
  const { user, userData, loading } = usePortalAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        Cargando...
      </div>
    )
  }

  if (!user || !userData) {
    return <Navigate to="/lideres" replace />
  }

  return children
}
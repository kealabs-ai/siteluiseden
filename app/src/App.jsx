import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { ToastProvider } from './ToastContext'
import { ModalProvider } from './ModalContext'

// Módulo Auth
import Login from './modules/auth/pages/Login'

// Módulos
import Dashboard from './modules/dashboard/pages/Dashboard'
import CashFlow from './modules/cashflow/pages/CashFlow'
import Sales from './modules/sales/pages/Sales'
import Catalog from './modules/catalog/pages/Catalog'
import LandscapingBudget from './modules/budgets/pages/LandscapingBudget'
import MaintenanceSchedule from './modules/maintenance/pages/MaintenanceSchedule'
import Supplier from './modules/supplier/pages/Supplier'

// Componentes Compartilhados
import Navigation from './components/Navigation'
import AppNavigation from './components/AppNavigation'
import AppSidebar from './components/AppSidebar'

// Páginas
import Home from './pages/Home'

// Componente de Rota Protegida
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

// Componente para renderizar conteúdo com Navigation condicional
function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isAppPage = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/cash-flow') || location.pathname.startsWith('/sales') || location.pathname.startsWith('/catalog') || location.pathname.startsWith('/landscaping-budget') || location.pathname.startsWith('/maintenance-schedule') || location.pathname.startsWith('/supplier')

  return (
    <div className="app">
      {isAppPage ? <AppNavigation /> : !isLoginPage && <Navigation />}
      {isAppPage && <AppSidebar />}
      <main className={`main-content ${isAppPage ? 'pt-16 pl-72' : ''}`}>
        <Routes>
          {/* Rota Pública - Home */}
          <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />

          {/* Rota Pública - Login */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Rotas Protegidas - Módulos */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cash-flow"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CashFlow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sales"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Sales />
              </ProtectedRoute>
            }
          />

          <Route
            path="/catalog"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Catalog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/landscaping-budget"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <LandscapingBudget />
              </ProtectedRoute>
            }
          />

          <Route
            path="/maintenance-schedule"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MaintenanceSchedule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supplier"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Supplier />
              </ProtectedRoute>
            }
          />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Verificar se há sessão salva ao carregar
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn')
    if (savedLogin === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <ToastProvider>
      <Router>
        <ModalProvider>
          <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </ModalProvider>
      </Router>
    </ToastProvider>
  )
}

export default App

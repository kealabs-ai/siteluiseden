import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

function AppSidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const modules = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-chart-line',
      path: '/dashboard',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: 'fa-leaf',
      path: '/catalog',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'sales',
      label: 'Vendas',
      icon: 'fa-shopping-cart',
      path: '/sales',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'budget',
      label: 'Orçamentos',
      icon: 'fa-file-invoice-dollar',
      path: '/landscaping-budget',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'cashflow',
      label: 'Fluxo de Caixa',
      icon: 'fa-money-bill-wave',
      path: '/cash-flow',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'maintenance',
      label: 'Agenda de Cuidados',
      icon: 'fa-wrench',
      path: '/maintenance-schedule',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'supplier',
      label: 'Fornecedores',
      icon: 'fa-truck',
      path: '/supplier',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-stone-200 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-stone-200 rounded-full p-1 hover:bg-stone-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        <i className={`fa-solid fa-chevron-${isCollapsed ? 'right' : 'left'} text-stone-600`}></i>
      </button>

      {/* Modules List */}
      <nav className="p-4 space-y-2 overflow-y-auto h-full">
        <div className={`${isCollapsed ? 'text-center' : ''} mb-6`}>
          <p className={`text-xs font-semibold text-stone-500 uppercase tracking-wider ${isCollapsed ? 'hidden' : ''}`}>
            Módulos
          </p>
        </div>

        {modules.map(module => (
          <Link
            key={module.id}
            to={module.path}
            className={`flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg transition-all group ${
              isActive(module.path)
                ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                : 'text-stone-700 hover:bg-stone-50'
            }`}
            title={isCollapsed ? module.label : ''}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isActive(module.path)
                  ? 'bg-white/20'
                  : `bg-gradient-to-r ${module.color} text-white group-hover:shadow-md`
              }`}
            >
              <i className={`fa-solid ${module.icon} text-lg`}></i>
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{module.label}</p>
              </div>
            )}

            {!isCollapsed && isActive(module.path) && (
              <i className="fa-solid fa-check text-white flex-shrink-0"></i>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-200 bg-stone-50">
          <p className="text-xs text-stone-500 text-center">
            <i className="fa-solid fa-leaf text-eden-primary mr-1"></i>
            Luis Eden
          </p>
        </div>
      )}
    </aside>
  )
}

export default AppSidebar

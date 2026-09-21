import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

function AppSidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const permissions = user.role === 'admin'
    ? ['dashboard', 'catalog', 'sales', 'budget', 'cashflow', 'maintenance', 'supplier', 'users']
    : user.permissoes || ['dashboard']

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
    },
    {
      id: 'users',
      label: 'Usuários e Acessos',
      icon: 'fa-users-gear',
      path: '/users',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-gradient-to-b from-white to-stone-50 border-r border-stone-200 transition-all duration-300 z-40 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-stone-200 rounded-full p-1 hover:bg-stone-100 transition-colors shadow-sm"
        aria-label="Toggle sidebar"
      >
        <i className={`fa-solid fa-chevron-${isCollapsed ? 'right' : 'left'} text-stone-600 text-xs`}></i>
      </button>

      {/* Header */}
      {!isCollapsed && (
        <div className="px-6 py-4 border-b border-stone-200">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Módulos</p>
        </div>
      )}

      {/* Modules List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {modules.filter(module => permissions.includes(module.id)).map(module => (
          <Link
            key={module.id}
            to={module.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive(module.path)
                ? `bg-gradient-to-r ${module.color} text-white shadow-md`
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            title={isCollapsed ? module.label : ''}
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center transition-all ${
                isActive(module.path)
                  ? 'bg-white/20'
                  : `bg-gradient-to-r ${module.color} text-white`
              }`}
            >
              <i className={`fa-solid ${module.icon} text-sm`}></i>
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{module.label}</p>
                </div>
                {isActive(module.path) && (
                  <i className="fa-solid fa-check text-white flex-shrink-0 text-xs"></i>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer Info */}
      <div className={`border-t border-stone-200 bg-stone-50 transition-all ${
        isCollapsed ? 'px-3 py-3' : 'px-6 py-4'
      }`}>
        {!isCollapsed ? (
          <div className="text-center">
            <p className="text-xs font-semibold text-stone-600 flex items-center justify-center gap-1">
              <i className="fa-solid fa-leaf text-eden-primary"></i>
              Luis Eden
            </p>
            <p className="text-xs text-stone-400 mt-1">Gestão</p>
          </div>
        ) : (
          <div className="text-center">
            <i className="fa-solid fa-leaf text-eden-primary text-lg"></i>
          </div>
        )}
      </div>
    </aside>
  )
}

export default AppSidebar

import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useModal()

  const [kpis] = useState({
    monthlyRevenue: 15420.50,
    netProfit: 8230.75,
    avgMargin: 42.5,
    activeOrders: 12
  })

  const [flowers] = useState([
    { id: 1, name: 'Rosa Vermelha', quantity: 3, minLevel: 10, price: 45.00, status: 'critical' },
    { id: 2, name: 'Orquídea Branca', quantity: 2, minLevel: 5, price: 65.00, status: 'critical' },
    { id: 3, name: 'Samambaia', quantity: 1, minLevel: 8, price: 25.00, status: 'critical' },
    { id: 4, name: 'Girassol', quantity: 15, minLevel: 10, price: 35.00, status: 'ok' },
    { id: 5, name: 'Tulipa', quantity: 8, minLevel: 5, price: 40.00, status: 'ok' }
  ])

  const [orders] = useState([
    { id: 1, client: 'Ana Maria S.', items: 'Arranjo Floral Premium', date: '2025-01-15', status: 'pending', total: 250.00 },
    { id: 2, client: 'Roberto C.', items: 'Buquê Especial', date: '2025-01-14', status: 'completed', total: 180.00 },
    { id: 3, client: 'Juliana & Lucas', items: 'Decoração Casamento', date: '2025-01-13', status: 'completed', total: 1500.00 }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'ok': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'critical': return 'fa-triangle-exclamation'
      case 'warning': return 'fa-exclamation'
      case 'ok': return 'fa-check-circle'
      case 'pending': return 'fa-clock'
      case 'completed': return 'fa-check'
      default: return 'fa-circle'
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Gestão de Floricultura</h1>
          <p className="text-stone-600 mt-1">Bem-vindo ao painel de controle</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-chart-line mr-2"></i>
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'inventory'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-boxes mr-2"></i>
            Estoque
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-shopping-cart mr-2"></i>
            Pedidos
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Faturamento Mensal</h3>
                  <i className="fa-solid fa-money-bill-wave text-eden-accent text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">R$ {kpis.monthlyRevenue.toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-2">↑ 12% vs mês anterior</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Lucro Líquido</h3>
                  <i className="fa-solid fa-chart-pie text-eden-light text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">R$ {kpis.netProfit.toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-2">↑ 8% vs mês anterior</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Margem Média</h3>
                  <i className="fa-solid fa-percent text-blue-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{kpis.avgMargin.toFixed(1)}%</p>
                <p className="text-xs text-stone-500 mt-2">Margem de lucro</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Pedidos Ativos</h3>
                  <i className="fa-solid fa-box text-purple-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{kpis.activeOrders}</p>
                <p className="text-xs text-stone-500 mt-2">Em processamento</p>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <h2 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                <i className="fa-solid fa-bell"></i>
                Alertas Importantes
              </h2>
              <div className="space-y-3">
                {flowers.filter(f => f.status === 'critical').map(flower => (
                  <div key={flower.id} className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <i className="fa-solid fa-triangle-exclamation text-red-600 text-xl"></i>
                    <div className="flex-1">
                      <p className="font-semibold text-red-900">{flower.name}</p>
                      <p className="text-sm text-red-700">Estoque crítico: {flower.quantity} unidades (mínimo: {flower.minLevel})</p>
                    </div>
                    <button onClick={() => openModal('financialEntry')} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                      Repor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-eden-primary">Controle de Estoque</h2>
              <button onClick={() => openModal('newPlant')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
                <i className="fa-solid fa-plus mr-2"></i>
                Adicionar Planta
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Flor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Quantidade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Mínimo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Preço Unit.</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {flowers.map(flower => (
                    <tr key={flower.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900">{flower.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{flower.quantity}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{flower.minLevel}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">R$ {flower.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(flower.status)}`}>
                          <i className={`fa-solid ${getStatusIcon(flower.status)}`}></i>
                          {flower.status === 'critical' ? 'Crítico' : 'OK'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => openModal('editPlant', flower)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-eden-primary">Pedidos</h2>
              <button onClick={() => openModal('quickSale')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
                <i className="fa-solid fa-plus mr-2"></i>
                Novo Pedido
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Cliente</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Itens</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{order.client}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{order.items}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <i className={`fa-solid ${getStatusIcon(order.status)}`}></i>
                          {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-eden-primary">R$ {order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-eden-primary hover:text-eden-light transition-colors mr-3">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

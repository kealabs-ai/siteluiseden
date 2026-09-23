import React, { useEffect, useState } from 'react'
import { useModal } from '../../../ModalContext'
import { catalogApi, financeApi, getApiError, salesApi } from '../../../services/api'
import { useToast } from '../../../ToastContext'
import { formatCurrency, formatPercentage } from '../../../utils/formatters'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useModal()

  const [kpis, setKpis] = useState({ monthlyRevenue: 0, netProfit: 0, avgMargin: 0, activeOrders: 0 })
  const [flowers, setFlowers] = useState([])
  const [orders, setOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [filterPeriod, setFilterPeriod] = useState('month')
  const { addToast } = useToast()

  const isCurrentMonth = (dateValue) => {
    const date = new Date(dateValue)
    const now = new Date()
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
  }

  const isCurrentYear = (dateValue) => {
    const date = new Date(dateValue)
    const now = new Date()
    return date.getFullYear() === now.getFullYear()
  }

  const isLast30Days = (dateValue) => {
    const date = new Date(dateValue)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  }

  const getFilteredSales = (sales) => {
    switch(filterPeriod) {
      case 'month':
        return sales.filter(sale => sale.status !== 'cancelada' && isCurrentMonth(sale.dataVenda || sale.createdAt))
      case 'year':
        return sales.filter(sale => sale.status !== 'cancelada' && isCurrentYear(sale.dataVenda || sale.createdAt))
      case 'last30':
        return sales.filter(sale => sale.status !== 'cancelada' && isLast30Days(sale.dataVenda || sale.createdAt))
      case 'all':
        return sales.filter(sale => sale.status !== 'cancelada')
      default:
        return sales.filter(sale => sale.status !== 'cancelada' && isCurrentMonth(sale.dataVenda || sale.createdAt))
    }
  }

  const loadDashboard = async () => {
    try {
      const [{ data: finance }, { data: sales }, { data: catalog }] = await Promise.all([
        financeApi.dashboard(), salesApi.list(), catalogApi.list()
      ])
      const filteredSales = getFilteredSales(sales)
      const revenueCents = filteredSales.reduce((total, sale) => total + sale.totalCents, 0)
      const marginBase = filteredSales.reduce((total, sale) => total + (sale.itens || []).reduce((itemsTotal, item) => {
        if (!item.custoCents || item.custoCents <= 0) return itemsTotal
        return itemsTotal + item.precoCents * item.quantidade
      }, 0), 0)
      const costCents = filteredSales.reduce((total, sale) => total + (sale.itens || []).reduce((itemsTotal, item) => {
        if (!item.custoCents || item.custoCents <= 0) return itemsTotal
        return itemsTotal + item.custoCents * item.quantidade
      }, 0), 0)
      const revenue = revenueCents / 100
      const margin = marginBase > 0 ? ((marginBase - costCents) / marginBase) * 100 : 0
      const expenses = finance.totalSaidas / 100
      setKpis({ monthlyRevenue: revenue, netProfit: revenue - expenses, avgMargin: margin, activeOrders: sales.filter(sale => sale.status !== 'concluida' && sale.status !== 'cancelada').length })
      setOrders(sales.map(sale => ({ id: sale.id, client: sale.clienteNome || 'Consumidor final', items: 'Venda registrada', date: sale.createdAt, status: sale.status === 'cancelada' ? 'cancelled' : sale.status === 'concluida' ? 'completed' : 'pending', total: sale.totalCents / 100 })))
      setFlowers(catalog.map(plant => ({ id: plant.id, name: plant.nome, quantity: plant.estoque, minLevel: 1, price: plant.precoCents / 100, status: plant.estoque < 1 ? 'critical' : 'ok' })))
      
      const productSales = {}
      filteredSales.forEach(sale => {
        (sale.itens || []).forEach(item => {
          if (!productSales[item.plantaId]) {
            const catalogItem = catalog.find(c => c.id === item.plantaId)
            productSales[item.plantaId] = {
              id: item.plantaId,
              name: catalogItem?.nome || 'Produto sem nome',
              description: catalogItem?.descricao || '',
              quantity: 0,
              revenue: 0,
              lastSaleDate: null
            }
          }
          productSales[item.plantaId].quantity += item.quantidade || 0
          productSales[item.plantaId].revenue += (item.precoCents * (item.quantidade || 0)) / 100
          productSales[item.plantaId].lastSaleDate = sale.dataVenda || sale.createdAt
        })
      })
      const sorted = Object.values(productSales)
        .filter(p => p.quantity > 0)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10)
      console.log('Top Products:', sorted)
      setTopProducts(sorted)
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível carregar o dashboard.'), 'error')
    }
  }

  useEffect(() => {
    loadDashboard()
    window.addEventListener('eden:data-changed', loadDashboard)
    return () => window.removeEventListener('eden:data-changed', loadDashboard)
  }, [filterPeriod])

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
                <p className="text-3xl font-bold text-eden-primary">{formatCurrency(kpis.monthlyRevenue)}</p>
                <p className="text-xs text-stone-500 mt-2">Vendas do mês atual</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Lucro Líquido</h3>
                  <i className="fa-solid fa-chart-pie text-eden-light text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{formatCurrency(kpis.netProfit)}</p>
                <p className="text-xs text-stone-500 mt-2">Faturamento menos despesas</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Margem Média</h3>
                  <i className="fa-solid fa-percent text-blue-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{formatPercentage(kpis.avgMargin)}</p>
                <p className="text-xs text-stone-500 mt-2">Custo versus preço de venda</p>
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

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Performance Chart */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-chart-line"></i>
                  Desempenho de Vendas
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-stone-700">Faturamento</span>
                      <span className="text-sm font-bold text-eden-primary">{formatCurrency(kpis.monthlyRevenue)}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-stone-700">Lucro Líquido</span>
                      <span className="text-sm font-bold text-eden-primary">{formatCurrency(kpis.netProfit)}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min((kpis.netProfit / kpis.monthlyRevenue) * 100, 100)}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-stone-700">Pedidos Ativos</span>
                      <span className="text-sm font-bold text-eden-primary">{kpis.activeOrders}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: `${Math.min((kpis.activeOrders / 50) * 100, 100)}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Margin Analysis */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-percent"></i>
                  Análise de Margem
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e7e5e4" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#2d5016"
                        strokeWidth="8"
                        strokeDasharray={`${(kpis.avgMargin / 100) * 282.7} 282.7`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-eden-primary">{formatPercentage(kpis.avgMargin)}</span>
                      <span className="text-xs text-stone-600">Margem Média</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 10 Products */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-eden-primary flex items-center gap-2">
                  <i className="fa-solid fa-trophy"></i>
                  Top 10 Produtos Mais Vendidos
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilterPeriod('last30')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterPeriod === 'last30'
                        ? 'bg-eden-primary text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Últimos 30 dias
                  </button>
                  <button
                    onClick={() => setFilterPeriod('month')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterPeriod === 'month'
                        ? 'bg-eden-primary text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Este mês
                  </button>
                  <button
                    onClick={() => setFilterPeriod('year')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterPeriod === 'year'
                        ? 'bg-eden-primary text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Este ano
                  </button>
                  <button
                    onClick={() => setFilterPeriod('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterPeriod === 'all'
                        ? 'bg-eden-primary text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Todos os períodos
                  </button>
                </div>
              </div>
              <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
                {topProducts.length > 0 ? (
                  <div className="space-y-3">
                    {topProducts.map((product, index) => (
                      <div key={`${product.id}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 hover:border-eden-primary hover:shadow-md transition-all group">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-eden-primary to-eden-light text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-stone-900 text-base group-hover:text-eden-primary transition-colors">{product.name}</p>
                          {product.description && (
                            <p className="text-sm text-stone-600 mt-1 line-clamp-2">{product.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-xl font-bold text-eden-primary">{product.quantity}</p>
                            <p className="text-xs text-stone-600">unidades</p>
                          </div>
                          {product.lastSaleDate && (
                            <div className="text-right text-xs text-stone-600 min-w-max">
                              <i className="fa-solid fa-calendar text-eden-accent mb-1 block"></i>
                              {new Date(product.lastSaleDate).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-stone-600 py-8">Nenhuma venda registrada neste período</p>
                )}
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
                    <button onClick={() => openModal('newQuotation', { plantaId: flower.id, plantaNome: flower.name })} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                      Nova Cotação
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-8">
            {/* Inventory KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Total em Estoque</h3>
                  <i className="fa-solid fa-boxes text-eden-primary text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{flowers.reduce((sum, f) => sum + f.quantity, 0)}</p>
                <p className="text-xs text-stone-500 mt-2">Unidades</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Produtos Críticos</h3>
                  <i className="fa-solid fa-triangle-exclamation text-red-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-red-600">{flowers.filter(f => f.status === 'critical').length}</p>
                <p className="text-xs text-stone-500 mt-2">Reposição necessária</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Valor Total</h3>
                  <i className="fa-solid fa-money-bill-wave text-eden-accent text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{formatCurrency(flowers.reduce((sum, f) => sum + (f.price * f.quantity), 0))}</p>
                <p className="text-xs text-stone-500 mt-2">Investimento em estoque</p>
              </div>
            </div>

            {/* Inventory Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stock Distribution */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-chart-pie"></i>
                  Distribuição de Estoque
                </h3>
                <div className="space-y-3">
                  {flowers.slice(0, 5).map((flower, index) => {
                    const total = flowers.reduce((sum, f) => sum + f.quantity, 0)
                    const percentage = (flower.quantity / total) * 100
                    return (
                      <div key={flower.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-stone-700">{flower.name}</span>
                          <span className="text-sm font-bold text-eden-primary">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-eden-primary to-eden-light h-2 rounded-full" style={{width: `${percentage}%`}}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Critical Items */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  Produtos em Alerta
                </h3>
                <div className="space-y-2">
                  {flowers.filter(f => f.status === 'critical').length > 0 ? (
                    flowers.filter(f => f.status === 'critical').map(flower => (
                      <div key={flower.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                        <div>
                          <p className="font-semibold text-red-900">{flower.name}</p>
                          <p className="text-xs text-red-700">{flower.quantity} unidades</p>
                        </div>
                        <button onClick={() => openModal('newQuotation', { plantaId: flower.id, plantaNome: flower.name })} className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors">
                          Nova Cotação
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-stone-600 py-4">Nenhum produto em alerta</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {/* Orders KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Total de Pedidos</h3>
                  <i className="fa-solid fa-shopping-cart text-blue-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{orders.length}</p>
                <p className="text-xs text-stone-500 mt-2">Todos os pedidos</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Pendentes</h3>
                  <i className="fa-solid fa-clock text-yellow-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</p>
                <p className="text-xs text-stone-500 mt-2">Aguardando processamento</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Concluídos</h3>
                  <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-green-600">{orders.filter(o => o.status === 'completed').length}</p>
                <p className="text-xs text-stone-500 mt-2">Finalizados</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-stone-600">Faturamento</h3>
                  <i className="fa-solid fa-money-bill-wave text-eden-accent text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-eden-primary">{formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}</p>
                <p className="text-xs text-stone-500 mt-2">Total de vendas</p>
              </div>
            </div>

            {/* Orders Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Status Distribution */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-chart-pie"></i>
                  Distribuição de Status
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e7e5e4" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="8"
                        strokeDasharray={`${(orders.filter(o => o.status === 'pending').length / orders.length) * 282.7} 282.7`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-eden-primary">{orders.length}</span>
                      <span className="text-xs text-stone-600">Pedidos</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-stone-600">Pendentes</span>
                    </div>
                    <span className="font-bold text-stone-900">{orders.filter(o => o.status === 'pending').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-stone-600">Concluídos</span>
                    </div>
                    <span className="font-bold text-stone-900">{orders.filter(o => o.status === 'completed').length}</span>
                  </div>
                </div>
              </div>

              {/* Top Clients */}
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-bold text-eden-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-users"></i>
                  Clientes Principais
                </h3>
                <div className="space-y-3">
                  {orders
                    .reduce((acc, order) => {
                      const existing = acc.find(o => o.client === order.client)
                      if (existing) {
                        existing.total += order.total
                        existing.count += 1
                      } else {
                        acc.push({ client: order.client, total: order.total, count: 1 })
                      }
                      return acc
                    }, [])
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 5)
                    .map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-stone-900">{client.client}</p>
                          <p className="text-xs text-stone-600">{client.count} pedidos</p>
                        </div>
                        <p className="font-bold text-eden-primary">{formatCurrency(client.total)}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

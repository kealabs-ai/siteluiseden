import React, { useEffect, useState } from 'react'
import { useModal } from '../../../ModalContext'
import { getApiError, salesApi } from '../../../services/api'
import { useToast } from '../../../ToastContext'

export default function Sales() {
  const [sales, setSales] = useState([])
  const { addToast } = useToast()

  const loadSales = async () => {
    try {
      const { data } = await salesApi.list()
      setSales(data.map(sale => ({
        ...sale,
        client: sale.clienteNome || 'Consumidor final',
        product: 'Venda registrada',
        date: sale.createdAt,
        amount: sale.totalCents / 100,
        status: sale.status === 'cancelada' ? 'cancelled' : sale.status === 'concluida' ? 'completed' : 'pending',
        payment: 'Não informado'
      })))
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível carregar as vendas.'), 'error')
    }
  }

  useEffect(() => {
    loadSales()
    window.addEventListener('eden:data-changed', loadSales)
    return () => window.removeEventListener('eden:data-changed', loadSales)
  }, [])

  const { openModal } = useModal()

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-green-100 text-green-800'
    if (status === 'cancelled') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const getStatusLabel = (status) => {
    if (status === 'completed') return 'Concluída'
    if (status === 'cancelled') return 'Cancelada'
    return 'Pendente'
  }

  const activeSales = sales.filter(sale => sale.status !== 'cancelled')
  const totalSales = activeSales.reduce((sum, sale) => sum + sale.amount, 0)
  const completedSales = sales.filter(s => s.status === 'completed').length

  const handleCancel = async (sale) => {
    if (sale.status === 'cancelled' || !window.confirm('Deseja cancelar esta venda e devolver os itens ao estoque?')) return
    try {
      await salesApi.cancel(sale.id, 'Cancelamento solicitado na tela de vendas')
      addToast('Venda cancelada e estoque restaurado.', 'success')
      loadSales()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível cancelar a venda.'), 'error')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Vendas</h1>
          <p className="text-stone-600 mt-1">Gerencie suas vendas e pedidos</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Vendas</h3>
              <i className="fa-solid fa-shopping-cart text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">R$ {totalSales.toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">{sales.length} transações</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Vendas Concluídas</h3>
              <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">{completedSales}</p>
            <p className="text-xs text-stone-500 mt-2">Neste período</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Ticket Médio</h3>
              <i className="fa-solid fa-money-bill-wave text-blue-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">R$ {(totalSales / sales.length).toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">Por venda</p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Histórico de Vendas</h2>
            <button onClick={() => openModal('quickSale')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
              <i className="fa-solid fa-plus mr-2"></i>
              Nova Venda
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Produto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Pagamento</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">#{sale.id}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{sale.client}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{sale.product}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{new Date(sale.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-eden-primary">R$ {sale.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{sale.payment}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                        <i className={`fa-solid ${sale.status === 'completed' ? 'fa-check' : sale.status === 'cancelled' ? 'fa-ban' : 'fa-clock'}`}></i>
                        {getStatusLabel(sale.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => openModal('viewSaleDetails', sale)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleCancel(sale)}
                        disabled={sale.status === 'cancelled'}
                        className={`${sale.status === 'cancelled' ? 'text-stone-300 cursor-not-allowed' : 'text-red-600 hover:text-red-700'} transition-colors`}
                        title={sale.status === 'cancelled' ? 'Venda já cancelada' : 'Cancelar venda'}
                      >
                        <i className="fa-solid fa-ban"></i>
                        <span className="sr-only">{sale.status === 'cancelled' ? 'Venda já cancelada' : 'Cancelar venda'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function LandscapingBudget() {
  const [budgets] = useState([
    { id: 1, client: 'Condomínio Verde', project: 'Paisagismo Residencial', amount: 5000.00, status: 'approved', date: '2025-01-10' },
    { id: 2, client: 'Empresa Tech', project: 'Jardim Corporativo', amount: 12000.00, status: 'pending', date: '2025-01-12' },
    { id: 3, client: 'Casa Moderna', project: 'Jardim Vertical', amount: 3500.00, status: 'approved', date: '2025-01-08' },
    { id: 4, client: 'Restaurante Flores', project: 'Decoração Externa', amount: 8000.00, status: 'rejected', date: '2025-01-05' },
    { id: 5, client: 'Casamento Silva', project: 'Decoração Casamento', amount: 2500.00, status: 'approved', date: '2025-01-15' }
  ])

  const { openModal } = useModal()

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'approved': return 'Aprovado'
      case 'pending': return 'Pendente'
      case 'rejected': return 'Rejeitado'
      default: return 'Desconhecido'
    }
  }

  const totalBudgets = budgets.reduce((sum, b) => sum + b.amount, 0)
  const approvedBudgets = budgets.filter(b => b.status === 'approved').reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Orçamentos</h1>
          <p className="text-stone-600 mt-1">Gerencie orçamentos de projetos</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Orçamentos</h3>
              <i className="fa-solid fa-file-invoice-dollar text-blue-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">R$ {totalBudgets.toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">{budgets.length} orçamentos</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Orçamentos Aprovados</h3>
              <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">R$ {approvedBudgets.toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">Valor aprovado</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Taxa de Aprovação</h3>
              <i className="fa-solid fa-chart-pie text-purple-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">
              {((budgets.filter(b => b.status === 'approved').length / budgets.length) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-stone-500 mt-2">De orçamentos</p>
          </div>
        </div>

        {/* Budgets Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Lista de Orçamentos</h2>
            <button onClick={() => openModal('budgetBuilder')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
              <i className="fa-solid fa-plus mr-2"></i>
              Novo Orçamento
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Projeto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map(budget => (
                  <tr key={budget.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">#{budget.id}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{budget.client}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{budget.project}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-eden-primary">R$ {budget.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{new Date(budget.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                        <i className={`fa-solid ${budget.status === 'approved' ? 'fa-check' : budget.status === 'pending' ? 'fa-clock' : 'fa-times'}`}></i>
                        {getStatusLabel(budget.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => openModal('viewBudgetDetails', budget)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
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
      </main>
    </div>
  )
}

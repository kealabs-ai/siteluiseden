import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function CashFlow() {
  const [transactions] = useState([
    { id: 1, description: 'Venda - Arranjo Floral', type: 'entrada', amount: 250.00, date: '2025-01-15', category: 'Vendas' },
    { id: 2, description: 'Compra - Flores Importadas', type: 'saida', amount: 800.00, date: '2025-01-14', category: 'Compras' },
    { id: 3, description: 'Venda - Buquê Especial', type: 'entrada', amount: 180.00, date: '2025-01-13', category: 'Vendas' },
    { id: 4, description: 'Aluguel - Loja', type: 'saida', amount: 2000.00, date: '2025-01-10', category: 'Despesas' },
    { id: 5, description: 'Venda - Decoração Casamento', type: 'entrada', amount: 1500.00, date: '2025-01-09', category: 'Vendas' },
    { id: 6, description: 'Salários - Funcionários', type: 'saida', amount: 3500.00, date: '2025-01-05', category: 'Despesas' }
  ])

  const { openModal } = useModal()
  const totalEntradas = transactions.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0)
  const totalSaidas = transactions.filter(t => t.type === 'saida').reduce((sum, t) => sum + t.amount, 0)
  const saldo = totalEntradas - totalSaidas

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Fluxo de Caixa</h1>
          <p className="text-stone-600 mt-1">Controle financeiro da empresa</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Entradas</h3>
              <i className="fa-solid fa-arrow-up text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-green-600">R$ {totalEntradas.toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">Receitas</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Saídas</h3>
              <i className="fa-solid fa-arrow-down text-red-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-red-600">R$ {totalSaidas.toFixed(2)}</p>
            <p className="text-xs text-stone-500 mt-2">Despesas</p>
          </div>

          <div className={`rounded-xl p-6 border border-stone-200 ${saldo >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Saldo</h3>
              <i className={`fa-solid fa-wallet text-2xl ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}></i>
            </div>
            <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldo.toFixed(2)}
            </p>
            <p className="text-xs text-stone-500 mt-2">Saldo atual</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Transações</h2>
            <button onClick={() => openModal('financialEntry')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
              <i className="fa-solid fa-plus mr-2"></i>
              Nova Transação
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Descrição</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Categoria</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">#{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{transaction.category}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <i className={`fa-solid ${transaction.type === 'entrada' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                        {transaction.type === 'entrada' ? 'Entrada' : 'Saída'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${
                      transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'entrada' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => openModal('editTransaction', transaction)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
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
      </main>
    </div>
  )
}

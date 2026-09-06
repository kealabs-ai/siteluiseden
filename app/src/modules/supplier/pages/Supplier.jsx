import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function Supplier() {
  const [activeTab, setActiveTab] = useState('suppliers')
  const { openModal } = useModal()

  const [suppliers] = useState([
    { id: 1, name: 'Flores Brasil', contact: 'João Silva', email: 'joao@floresbrasil.com', phone: '(11) 98765-4321', status: 'active', lastOrder: '2025-01-15' },
    { id: 2, name: 'Plantas Premium', contact: 'Maria Santos', email: 'maria@plantaspremium.com', phone: '(21) 99876-5432', status: 'active', lastOrder: '2025-01-10' },
    { id: 3, name: 'Importações Verdes', contact: 'Carlos Costa', email: 'carlos@importacoes.com', phone: '(31) 97654-3210', status: 'inactive', lastOrder: '2024-12-20' }
  ])

  const [quotations] = useState([
    { id: 1, supplier: 'Flores Brasil', product: 'Rosa Vermelha', quantity: 100, costPrice: 25.00, salePrice: 45.00, margin: 44.4, date: '2025-01-15', status: 'active' },
    { id: 2, supplier: 'Plantas Premium', product: 'Orquídea Branca', quantity: 50, costPrice: 40.00, salePrice: 65.00, margin: 38.5, date: '2025-01-14', status: 'active' },
    { id: 3, supplier: 'Flores Brasil', product: 'Girassol', quantity: 200, costPrice: 18.00, salePrice: 35.00, margin: 48.6, date: '2025-01-13', status: 'active' },
    { id: 4, supplier: 'Importações Verdes', product: 'Tulipa', quantity: 150, costPrice: 22.00, salePrice: 40.00, margin: 45.0, date: '2025-01-12', status: 'inactive' }
  ])

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Ativo' : 'Inativo'
  }

  const getMarginColor = (margin) => {
    if (margin >= 45) return 'text-green-600'
    if (margin >= 35) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Parceiros & Fornecedores</h1>
          <p className="text-stone-600 mt-1">Gerencie fornecedores e cotações de preços</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'suppliers'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-handshake mr-2"></i>
            Fornecedores
          </button>
          <button
            onClick={() => setActiveTab('quotations')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'quotations'
                ? 'border-eden-primary text-eden-primary'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <i className="fa-solid fa-file-invoice mr-2"></i>
            Cotações
          </button>
        </div>

        {/* Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-eden-primary">Lista de Fornecedores</h2>
              <div className="flex gap-3">
                <button onClick={() => openModal('importExcel')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2">
                  <i className="fa-solid fa-file-excel"></i>
                  Importar Excel
                </button>
                <button onClick={() => openModal('newSupplier')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
                  <i className="fa-solid fa-plus mr-2"></i>
                  Novo Fornecedor
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Fornecedor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Contato</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Telefone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Último Pedido</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(supplier => (
                    <tr key={supplier.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900">{supplier.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{supplier.contact}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{supplier.email}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{supplier.phone}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{new Date(supplier.lastOrder).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                          <i className={`fa-solid ${supplier.status === 'active' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                          {getStatusLabel(supplier.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => openModal('editSupplier', supplier)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
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

        {/* Quotations Tab */}
        {activeTab === 'quotations' && (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-eden-primary">Cotações de Preços</h2>
              <button onClick={() => openModal('newQuotation')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
                <i className="fa-solid fa-plus mr-2"></i>
                Nova Cotação
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Fornecedor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Produto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Quantidade</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-stone-700">Preço Custo</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-stone-700">Preço Venda</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-stone-700">Margem</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map(quote => (
                    <tr key={quote.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900">{quote.supplier}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{quote.product}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{quote.quantity}</td>
                      <td className="px-6 py-4 text-sm text-stone-600 text-right">R$ {quote.costPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-eden-primary text-right">R$ {quote.salePrice.toFixed(2)}</td>
                      <td className={`px-6 py-4 text-sm font-bold text-right ${getMarginColor(quote.margin)}`}>
                        {quote.margin.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600">{new Date(quote.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          <i className={`fa-solid ${quote.status === 'active' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                          {getStatusLabel(quote.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => openModal('editQuotation', quote)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
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
      </main>
    </div>
  )
}

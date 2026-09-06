import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'

export function EditTransactionModal({ isOpen, onClose, transactionData = {} }) {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    description: '',
    type: 'entrada',
    amount: '',
    category: 'Vendas',
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if (transactionData && transactionData.id) {
      setFormData({
        description: transactionData.description || '',
        type: transactionData.type || 'entrada',
        amount: transactionData.amount || '',
        category: transactionData.category || 'Vendas',
        date: transactionData.date ? new Date(transactionData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      })
    }
  }, [transactionData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.description || !formData.amount || !formData.date) {
      showToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    showToast(`Transação "${formData.description}" atualizada com sucesso!`, 'success')
    onClose()
  }

  if (!isOpen) return null

  const categories = {
    entrada: ['Vendas', 'Serviços', 'Devolução', 'Outro'],
    saida: ['Compras', 'Despesas', 'Salários', 'Aluguel', 'Outro']
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-money-bill-wave"></i>
            Editar Transação
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Descrição *
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex: Venda - Arranjo Floral"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Tipo *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="entrada">Entrada (Receita)</option>
                  <option value="saida">Saída (Despesa)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Categoria *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              {/* Summary */}
              <div className={`p-4 rounded-lg border-2 ${formData.type === 'entrada' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-sm font-semibold mb-2 ${formData.type === 'entrada' ? 'text-green-700' : 'text-red-700'}`}>
                  {formData.type === 'entrada' ? 'Entrada' : 'Saída'}
                </p>
                <p className={`text-2xl font-bold ${formData.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                  {formData.type === 'entrada' ? '+' : '-'} R$ {parseFloat(formData.amount || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-check"></i>
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

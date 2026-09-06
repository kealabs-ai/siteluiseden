import React, { useState } from 'react'
import { useToast } from '../ToastContext'

export function FinancialEntryModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    type: 'entrada',
    description: '',
    value: '',
    category: 'vendas',
    origin: ''
  })

  const categories = {
    entrada: ['Venda Balcão', 'Serviço Paisagismo', 'Outro'],
    saida: ['Fornecedor Plantas', 'Insumos & Vasos', 'Operacional', 'Outro']
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTypeChange = (e) => {
    const newType = e.target.value
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: newType === 'entrada' ? 'vendas' : 'fornecedor'
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.description || !formData.value || !formData.category) {
      addToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    const typeLabel = formData.type === 'entrada' ? 'Receita' : 'Despesa'
    const symbol = formData.type === 'entrada' ? '+' : '-'
    
    addToast(`${typeLabel} de R$ ${parseFloat(formData.value).toFixed(2)} registrada com sucesso!`, 'success')
    
    setFormData({
      type: 'entrada',
      description: '',
      value: '',
      category: 'vendas',
      origin: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-money-bill-wave"></i>
            Lançamento Financeiro
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Tipo de Transação
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="entrada"
                  checked={formData.type === 'entrada'}
                  onChange={handleTypeChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-stone-700">
                  <i className="fa-solid fa-arrow-up text-green-600 mr-1"></i>
                  Receita
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="saida"
                  checked={formData.type === 'saida'}
                  onChange={handleTypeChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-stone-700">
                  <i className="fa-solid fa-arrow-down text-red-600 mr-1"></i>
                  Despesa
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Descrição
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Venda de arranjo floral"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
            />
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Valor (R$)
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
            >
              {categories[formData.type].map(cat => (
                <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '_')}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Origin/Supplier */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Fornecedor/Origem (Opcional)
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Ex: Fornecedor XYZ"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
            />
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
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useToast } from '../ToastContext'

export function NewQuotationModal({ isOpen, onClose }) {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    supplier: '',
    product: '',
    quantity: '',
    costPrice: '',
    salePrice: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.supplier || !formData.product || !formData.quantity || !formData.costPrice || !formData.salePrice) {
      showToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    const margin = ((parseFloat(formData.salePrice) - parseFloat(formData.costPrice)) / parseFloat(formData.salePrice) * 100).toFixed(1)
    showToast(`Cotação de "${formData.product}" cadastrada com sucesso! Margem: ${margin}%`, 'success')
    
    setFormData({
      supplier: '',
      product: '',
      quantity: '',
      costPrice: '',
      salePrice: ''
    })
    onClose()
  }

  if (!isOpen) return null

  const costPrice = parseFloat(formData.costPrice) || 0
  const salePrice = parseFloat(formData.salePrice) || 0
  const profit = salePrice - costPrice
  const margin = salePrice > 0 ? ((profit / salePrice) * 100).toFixed(1) : 0

  const getMarginColor = (margin) => {
    if (margin >= 45) return 'text-green-600'
    if (margin >= 35) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-file-invoice"></i>
            Nova Cotação
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
                  Fornecedor *
                </label>
                <select
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="">-- Selecione um fornecedor --</option>
                  <option value="Flores Brasil">Flores Brasil</option>
                  <option value="Plantas Premium">Plantas Premium</option>
                  <option value="Importações Verdes">Importações Verdes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Produto *
                </label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Ex: Rosa Vermelha"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Quantidade *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="100"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Preço de Custo (R$) *
                </label>
                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Preço de Venda (R$) *
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              {/* Financial Summary */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200 space-y-3">
                <h3 className="font-bold text-stone-900 text-sm">Resumo Financeiro</h3>
                
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-600">Custo Unit.:</span>
                  <span className="font-semibold text-stone-900">R$ {costPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-600">Venda Unit.:</span>
                  <span className="font-semibold text-eden-primary">R$ {salePrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b-2 border-eden-primary">
                  <span className="text-xs text-stone-600 font-semibold">Lucro Unit.:</span>
                  <span className="font-bold text-green-600">R$ {profit.toFixed(2)}</span>
                </div>

                <div className="bg-white p-3 rounded text-center">
                  <p className="text-xs text-stone-600 mb-1">Margem de Venda</p>
                  <p className={`text-2xl font-bold ${getMarginColor(margin)}`}>
                    {margin}%
                  </p>
                </div>
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
              Cadastrar Cotação
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

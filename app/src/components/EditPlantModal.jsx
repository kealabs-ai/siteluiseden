import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'

export function EditPlantModal({ isOpen, onClose, plantData = {} }) {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    supplier: '',
    cost: '',
    salePrice: '',
    stock: '',
    lightRequirement: 'medium',
    waterFrequency: 'daily'
  })

  useEffect(() => {
    if (plantData && plantData.id) {
      setFormData({
        name: plantData.name || '',
        supplier: plantData.supplier || '',
        cost: plantData.cost || plantData.price || '',
        salePrice: plantData.salePrice || plantData.price || '',
        stock: plantData.stock || plantData.quantity || '',
        lightRequirement: plantData.lightRequirement || 'medium',
        waterFrequency: plantData.waterFrequency || 'daily'
      })
    }
  }, [plantData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.supplier || !formData.cost || !formData.salePrice || !formData.stock) {
      showToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    showToast(`Planta "${formData.name}" atualizada com sucesso!`, 'success')
    onClose()
  }

  if (!isOpen) return null

  const cost = parseFloat(formData.cost) || 0
  const salePrice = parseFloat(formData.salePrice) || 0
  const markup = cost > 0 ? ((salePrice - cost) / cost * 100).toFixed(1) : 0
  const margin = salePrice > 0 ? ((salePrice - cost) / salePrice * 100).toFixed(1) : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-leaf"></i>
            Editar Planta
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
                  Nome da Planta *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Rosa Vermelha"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Fornecedor *
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Ex: Fornecedor XYZ"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Custo (R$) *
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Preço Venda (R$) *
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Estoque *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Exigência de Luz
                </label>
                <select
                  name="lightRequirement"
                  value={formData.lightRequirement}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="low">Baixa (Sombra)</option>
                  <option value="medium">Média (Meia Sombra)</option>
                  <option value="high">Alta (Pleno Sol)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Frequência de Rega
                </label>
                <select
                  name="waterFrequency"
                  value={formData.waterFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="daily">Diária</option>
                  <option value="alternate">Dia Sim, Dia Não</option>
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quinzenal</option>
                </select>
              </div>

              {/* Financial Summary */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200 space-y-3">
                <h3 className="font-bold text-stone-900 text-sm">Resumo Financeiro</h3>
                
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-600">Custo:</span>
                  <span className="font-semibold text-stone-900">R$ {cost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-600">Preço Venda:</span>
                  <span className="font-semibold text-eden-primary">R$ {salePrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b-2 border-eden-primary">
                  <span className="text-xs text-stone-600 font-semibold">Lucro Unit.:</span>
                  <span className="font-bold text-green-600">R$ {(salePrice - cost).toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-white p-2 rounded text-center">
                    <p className="text-xs text-stone-600">Markup</p>
                    <p className="font-bold text-eden-primary">{markup}%</p>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <p className="text-xs text-stone-600">Margem</p>
                    <p className="font-bold text-eden-primary">{margin}%</p>
                  </div>
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

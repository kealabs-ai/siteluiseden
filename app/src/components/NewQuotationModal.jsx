import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, notifyDataChanged, quotationApi, supplierApi } from '../services/api'
import { masks, currencyTocents } from '../utils/inputMasks'
import { formatCurrency } from '../utils/formatCurrency'

export function NewQuotationModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [suppliers, setSuppliers] = useState([])
  const [formData, setFormData] = useState({
    supplierId: '',
    description: '',
    quantity: '',
    costPrice: '',
    salePrice: '',
    lightRequirement: 'medium',
    waterFrequency: 'daily'
  })

  useEffect(() => {
    if (isOpen) {
      loadSuppliers()
    }
  }, [isOpen])

  const loadSuppliers = async () => {
    try {
      const { data } = await supplierApi.list()
      setSuppliers(data)
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível carregar fornecedores.'), 'error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'quantity') {
      maskedValue = masks.quantity(value)
    } else if (name === 'costPrice' || name === 'salePrice') {
      maskedValue = masks.currency(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }))
  }

  const calculateProfit = () => {
    if (!formData.costPrice || !formData.salePrice) return 0
    const cost = currencyTocents(formData.costPrice) / 100
    const sale = currencyTocents(formData.salePrice) / 100
    return (sale - cost).toFixed(2)
  }

  const calculateMargin = () => {
    if (!formData.costPrice || !formData.salePrice) return 0
    const cost = currencyTocents(formData.costPrice) / 100
    const sale = currencyTocents(formData.salePrice) / 100
    if (cost === 0) return 0
    return (((sale - cost) / cost) * 100).toFixed(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.supplierId || !formData.description || !formData.costPrice || !formData.salePrice) {
      addToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    if (!formData.quantity || parseInt(formData.quantity) === 0) {
      addToast('Quantidade deve ser maior que 0', 'error')
      return
    }

    try {
      await quotationApi.create({
        fornecedorId: formData.supplierId,
        descricao: formData.description,
        quantidade: parseInt(formData.quantity),
        precoCustoCents: currencyTocents(formData.costPrice),
        precoVendaCents: currencyTocents(formData.salePrice)
      })
      addToast('Cotação cadastrada com sucesso!', 'success')
      notifyDataChanged('cotacoes')
      setFormData({
        supplierId: '',
        description: '',
        quantity: '',
        costPrice: '',
        salePrice: '',
        lightRequirement: 'medium',
        waterFrequency: 'daily'
      })
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível cadastrar a cotação.'), 'error')
    }
  }

  if (!isOpen) return null

  const cost = currencyTocents(formData.costPrice) / 100
  const salePrice = currencyTocents(formData.salePrice) / 100
  const markup = cost > 0 ? ((salePrice - cost) / cost * 100).toFixed(1) : 0
  const margin = salePrice > 0 ? ((salePrice - cost) / salePrice * 100).toFixed(1) : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="">Selecione um fornecedor</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Descrição do Produto *
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex: Rosa Vermelha Premium"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Preço de Custo (R$) *
                  </label>
                  <input
                    type="text"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="text"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Quantidade *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
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
                  <span className="text-xs text-stone-600">Custo Unit.:</span>
                  <span className="font-semibold text-stone-900">{formatCurrency(currencyTocents(formData.costPrice) / 100)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-600">Preço Venda:</span>
                  <span className="font-semibold text-eden-primary">{formatCurrency(currencyTocents(formData.salePrice) / 100)}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b-2 border-eden-primary">
                  <span className="text-xs text-stone-600 font-semibold">Lucro Unit.:</span>
                  <span className="font-bold text-green-600">{formatCurrency(parseFloat(calculateProfit()))}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-white p-2 rounded text-center">
                    <p className="text-xs text-stone-600">Markup</p>
                    <p className="font-bold text-eden-primary">{calculateMargin()}%</p>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <p className="text-xs text-stone-600">Margem</p>
                    <p className="font-bold text-eden-primary">{calculateMargin()}%</p>
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
              Cadastrar Cotação
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, notifyDataChanged, quotationApi, supplierApi } from '../services/api'
import { masks, currencyTocents } from '../utils/inputMasks'

export function NewQuotationModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [suppliers, setSuppliers] = useState([])
  const [formData, setFormData] = useState({
    supplierId: '',
    description: '',
    quantity: '',
    costPrice: '',
    salePrice: ''
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
        salePrice: ''
      })
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível cadastrar a cotação.'), 'error')
    }
  }

  if (!isOpen) return null

  const margin = calculateMargin()

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

            <div className="space-y-4">
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

              {formData.costPrice && formData.salePrice && (
                <div className="bg-eden-primary/10 p-4 rounded-lg border-2 border-eden-primary/20">
                  <p className="text-sm text-stone-600 mb-1">Margem de Lucro:</p>
                  <p className={`text-3xl font-bold ${margin >= 35 ? 'text-green-600' : margin >= 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {margin}%
                  </p>
                </div>
              )}
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

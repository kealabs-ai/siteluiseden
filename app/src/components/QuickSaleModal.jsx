import React, { useEffect, useState } from 'react'
import { useToast } from '../ToastContext'
import { catalogApi, getApiError, notifyDataChanged, salesApi } from '../services/api'

const getLocalDateTime = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 16)
}

export function QuickSaleModal({ isOpen, onClose, flowers = [] }) {
  const { addToast } = useToast()
  const [catalogFlowers, setCatalogFlowers] = useState([])
  const [catalogLoading, setCatalogLoading] = useState(false)
  const [catalogError, setCatalogError] = useState('')
  const [formData, setFormData] = useState({
    client: '',
    flower: '',
    quantity: 1,
    paymentMethod: 'pix',
    saleDate: getLocalDateTime()
  })

  useEffect(() => {
    if (!isOpen) return

    const loadCatalog = async () => {
      setCatalogLoading(true)
      setCatalogError('')
      try {
        const { data } = await catalogApi.list()
        setCatalogFlowers(data.map(plant => ({
          id: plant.id,
          name: plant.nome,
          price: plant.precoCents / 100,
          stock: plant.estoque
        })))
      } catch (error) {
        setCatalogFlowers([])
        setCatalogError(getApiError(error, 'Não foi possível carregar as plantas.'))
      } finally {
        setCatalogLoading(false)
      }
    }

    loadCatalog()
  }, [isOpen])

  const availableFlowers = catalogFlowers
  const selectedFlower = availableFlowers.find(f => String(f.id) === String(formData.flower))
  
  const costTotal = selectedFlower ? selectedFlower.price * formData.quantity : 0
  const saleTotal = selectedFlower ? selectedFlower.price * 1.5 * formData.quantity : 0
  const profit = saleTotal - costTotal
  const margin = saleTotal > 0 ? ((profit / saleTotal) * 100).toFixed(1) : 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.client || !formData.flower || !formData.saleDate || formData.quantity < 1) {
      addToast('Preencha todos os campos', 'error')
      return
    }

    try {
      await salesApi.create({
        clienteNome: formData.client,
        dataVenda: new Date(formData.saleDate).toISOString(),
        totalCents: Math.round(saleTotal * 100),
        status: 'concluida',
        observacoes: `Produto: ${selectedFlower.name}; Quantidade: ${formData.quantity}; Pagamento: ${formData.paymentMethod}`
      })
      addToast(`Venda de ${formData.quantity}x ${selectedFlower.name} registrada! Lucro: R$ ${profit.toFixed(2)}`, 'success')
      notifyDataChanged('vendas')
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível registrar a venda.'), 'error')
      return
    }
    
    setFormData({
      client: '',
      flower: '',
      quantity: 1,
      paymentMethod: 'pix',
      saleDate: getLocalDateTime()
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-shopping-cart"></i>
            Nova Venda Rápida
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Left Column - Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Selecione a Planta
                </label>
                <select
                  name="flower"
                  value={formData.flower}
                  onChange={handleChange}
                  disabled={catalogLoading}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="">
                    {catalogLoading
                      ? 'Carregando plantas...'
                      : availableFlowers.length === 0
                        ? 'Nenhuma planta disponível'
                        : '-- Escolha uma planta --'}
                  </option>
                  {availableFlowers.map(flower => (
                    <option key={flower.id} value={flower.id}>
                      {flower.name} - R$ {flower.price.toFixed(2)}{flower.stock !== undefined ? ` (${flower.stock} em estoque)` : ''}
                    </option>
                  ))}
                </select>
                {catalogError && <p className="mt-2 text-sm text-red-600">{catalogError}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label htmlFor="saleDate" className="block text-sm font-semibold text-stone-700 mb-2">
                  Data da Venda
                </label>
                <input
                  type="datetime-local"
                  id="saleDate"
                  name="saleDate"
                  value={formData.saleDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Forma de Pagamento
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="pix">PIX</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="bg-stone-50 p-6 rounded-xl border-2 border-stone-200">
              <h3 className="text-lg font-bold text-eden-primary mb-6">Resumo Financeiro</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                  <span className="text-stone-600">Custo Total (Fornecedor):</span>
                  <span className="text-lg font-semibold text-stone-900">R$ {costTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                  <span className="text-stone-600">Valor Total (Cliente):</span>
                  <span className="text-lg font-semibold text-eden-primary">R$ {saleTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b-2 border-eden-primary">
                  <span className="text-stone-600 font-semibold">Lucro Líquido:</span>
                  <span className="text-2xl font-bold text-green-600">R$ {profit.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-4 bg-white p-4 rounded-lg">
                  <span className="text-stone-600 font-semibold">Margem:</span>
                  <span className="text-2xl font-bold text-eden-primary">{margin}%</span>
                </div>
              </div>

              {selectedFlower && (
                <div className="mt-6 p-4 bg-eden-accent-light rounded-lg">
                  <p className="text-sm text-stone-700">
                    <i className="fa-solid fa-info-circle text-eden-primary mr-2"></i>
                    Você está vendendo <strong>{formData.quantity}x {selectedFlower.name}</strong>
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
              Confirmar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

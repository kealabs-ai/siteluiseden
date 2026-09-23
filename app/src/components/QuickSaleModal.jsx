import React, { useEffect, useState } from 'react'
import { useToast } from '../ToastContext'
import { catalogApi, clientsApi, getApiError, notifyDataChanged, salesApi } from '../services/api'
import { masks, currencyTocents } from '../utils/inputMasks'

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
  const [clients, setClients] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [clientsError, setClientsError] = useState('')
  const [clientSearch, setClientSearch] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [formData, setFormData] = useState({
    client: '',
    clientId: '',
    flower: '',
    quantity: 1,
    paymentMethod: 'pix',
    saleDate: getLocalDateTime(),
    discountPercent: 0
  })
  const [saleItems, setSaleItems] = useState([])

  useEffect(() => {
    if (!isOpen) return

    const loadData = async () => {
      setCatalogLoading(true)
      setCatalogError('')
      setClientsLoading(true)
      setClientsError('')
      try {
        const [catalogRes, clientsRes] = await Promise.all([
          catalogApi.list(),
          clientsApi.list()
        ])
        setCatalogFlowers(catalogRes.data.map(plant => ({
          id: plant.id,
          name: plant.nome,
          price: plant.precoCents / 100,
          stock: plant.estoque
        })))
        setClients(clientsRes.data.map(client => ({
          id: client.id,
          name: client.nome,
          phone: client.telefone
        })))
      } catch (error) {
        setCatalogFlowers([])
        setCatalogError(getApiError(error, 'Não foi possível carregar as plantas.'))
        setClients([])
        setClientsError(getApiError(error, 'Não foi possível carregar os clientes.'))
      } finally {
        setCatalogLoading(false)
        setClientsLoading(false)
      }
    }

    loadData()
  }, [isOpen])

  const availableFlowers = catalogFlowers
  const selectedFlower = availableFlowers.find(f => String(f.id) === String(formData.flower))
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  )
  const subtotal = saleItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountPercent = Math.min(100, Math.max(0, Number(formData.discountPercent) || 0))
  const discountAmount = subtotal * (discountPercent / 100)
  const saleTotal = subtotal - discountAmount

  const handleChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'discountPercent') {
      maskedValue = value.replace(/[^0-9.]/g, '')
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : maskedValue
    }))
  }

  const handleClientSelect = (client) => {
    setFormData(prev => ({
      ...prev,
      client: client.name,
      clientId: client.id
    }))
    setClientSearch('')
    setShowClientDropdown(false)
  }

  const addItem = () => {
    if (!selectedFlower || formData.quantity < 1) {
      addToast('Selecione uma planta e informe uma quantidade válida.', 'error')
      return
    }

    setSaleItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === selectedFlower.id)
      if (existingItem) {
        return prevItems.map(item => item.id === selectedFlower.id
          ? { ...item, quantity: item.quantity + formData.quantity }
          : item)
      }
      return [...prevItems, {
        id: selectedFlower.id,
        name: selectedFlower.name,
        price: selectedFlower.price,
        quantity: formData.quantity
      }]
    })

    setFormData(prev => ({ ...prev, flower: '', quantity: 1 }))
  }

  const removeItem = (itemId) => {
    setSaleItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.clientId || saleItems.length === 0 || !formData.saleDate) {
      addToast('Selecione um cliente, a data e adicione ao menos um item.', 'error')
      return
    }

    try {
      await salesApi.create({
        clienteNome: formData.client,
        dataVenda: new Date(formData.saleDate).toISOString(),
        totalCents: Math.round(saleTotal * 100),
        status: 'concluida',
        itens: saleItems.map(item => ({
          plantaId: item.id,
          quantidade: item.quantity,
          precoCents: Math.round(item.price * 100)
        })),
        observacoes: `Itens: ${saleItems.map(item => `${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})`).join(', ')}; Desconto: ${discountPercent.toFixed(2)}%; Pagamento: ${formData.paymentMethod}`
      })
      addToast('Venda registrada com sucesso!', 'success')
      notifyDataChanged('vendas')
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível registrar a venda.'), 'error')
      return
    }
    
    setFormData({
      client: '',
      clientId: '',
      flower: '',
      quantity: 1,
      paymentMethod: 'pix',
      saleDate: getLocalDateTime(),
      discountPercent: 0
    })
    setSaleItems([])
    setClientSearch('')
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
              <div className="relative">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={clientSearch || formData.client}
                  onChange={(e) => {
                    setClientSearch(e.target.value)
                    setShowClientDropdown(true)
                  }}
                  onFocus={() => setShowClientDropdown(true)}
                  placeholder="Buscar cliente..."
                  disabled={clientsLoading}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20 disabled:opacity-50"
                />
                {clientsError && <p className="mt-2 text-sm text-red-600">{clientsError}</p>}
                {showClientDropdown && (clientSearch || !formData.client) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-stone-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredClients.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-stone-500">
                        {clientsLoading ? 'Carregando clientes...' : 'Nenhum cliente encontrado'}
                      </div>
                    ) : (
                      filteredClients.map(client => (
                        <button
                          key={client.id}
                          type="button"
                          onClick={() => handleClientSelect(client)}
                          className="w-full text-left px-4 py-3 hover:bg-eden-accent-light transition-colors border-b border-stone-100 last:border-b-0"
                        >
                          <p className="font-semibold text-stone-800">{client.name}</p>
                          {client.phone && <p className="text-xs text-stone-500">{client.phone}</p>}
                        </button>
                      ))
                    )}
                  </div>
                )}
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

              <button
                type="button"
                onClick={addItem}
                disabled={catalogLoading || !selectedFlower}
                className="w-full px-4 py-3 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-cart-plus mr-2"></i>
                Adicionar Item
              </button>

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

                <div className="mb-5 space-y-3">
                  {saleItems.length === 0 ? (
                    <p className="text-sm text-stone-500">Adicione plantas para montar a venda.</p>
                  ) : (
                    saleItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-stone-200">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-stone-800 truncate">{item.quantity}x {item.name}</p>
                          <p className="text-xs text-stone-500">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-red-600 hover:text-red-700"
                          aria-label={`Remover ${item.name}`}
                          title={`Remover ${item.name}`}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                    <span className="text-stone-600">Subtotal:</span>
                    <span className="text-lg font-semibold text-stone-900">R$ {subtotal.toFixed(2)}</span>
                </div>

                  <div>
                    <label htmlFor="discountPercent" className="block text-sm font-semibold text-stone-700 mb-2">
                      Desconto (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="discountPercent"
                        name="discountPercent"
                        value={formData.discountPercent}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.01"
                        className="w-full px-4 py-3 pr-10 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                    <span className="text-stone-600">Desconto:</span>
                    <span className="text-lg font-semibold text-red-600">- R$ {discountAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 bg-white p-4 rounded-lg">
                    <span className="text-stone-600 font-semibold">Preço Final:</span>
                    <span className="text-2xl font-bold text-eden-primary">R$ {saleTotal.toFixed(2)}</span>
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

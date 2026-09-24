import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { budgetApi, catalogApi, clientsApi, getApiError, notifyDataChanged } from '../services/api'
import { masks, currencyTocents } from '../utils/inputMasks'
import { formatCurrency } from '../utils/formatCurrency'

export function BudgetBuilderModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [flowers, setFlowers] = useState([])
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [showClientSuggestions, setShowClientSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [clientData, setClientData] = useState({
    clientName: '',
    projectType: 'residential'
  })

  const [budgetItems, setBudgetItems] = useState([])
  const [selectedFlower, setSelectedFlower] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [costs, setCosts] = useState({
    materials: '',
    labor: ''
  })

  useEffect(() => {
    if (isOpen) {
      loadFlowers()
      loadClients()
    }
  }, [isOpen])

  const loadFlowers = async () => {
    try {
      setLoading(true)
      const { data } = await catalogApi.list()
      setFlowers(data || [])
    } catch (error) {
      addToast(getApiError(error, 'Erro ao carregar plantas'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const loadClients = async () => {
    try {
      const { data } = await clientsApi.list()
      setClients(data || [])
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  const handleClientSearch = (value) => {
    setClientData(prev => ({
      ...prev,
      clientName: value
    }))

    if (value.length > 0) {
      const filtered = clients.filter(client =>
        (client.nome || '').toLowerCase().includes(value.toLowerCase()) ||
        (client.email || '').toLowerCase().includes(value.toLowerCase())
      )
      setFilteredClients(filtered)
      setShowClientSuggestions(true)
    } else {
      setFilteredClients([])
      setShowClientSuggestions(false)
    }
  }

  const selectClient = (client) => {
    setClientData(prev => ({
      ...prev,
      clientName: client.nome || ''
    }))
    setShowClientSuggestions(false)
  }

  const handleClientChange = (e) => {
    const { name, value } = e.target
    setClientData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCostChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'materials' || name === 'labor') {
      maskedValue = masks.currency(value)
    }

    setCosts(prev => ({
      ...prev,
      [name]: maskedValue
    }))
  }

  const addItem = () => {
    if (!selectedFlower || quantity < 1) {
      addToast('Selecione uma planta e quantidade válida', 'error')
      return
    }

    const flower = flowers.find(f => f.id === selectedFlower)
    if (!flower) {
      addToast('Planta não encontrada', 'error')
      return
    }

    const costUnit = (flower.custoCents || flower.precoCents) / 100
    const saleUnit = (flower.precoCents || 0) / 100
    const subtotal = saleUnit * quantity

    const item = {
      id: Date.now(),
      flowerName: flower.nome,
      flowerId: flower.id,
      quantity,
      costUnit,
      saleUnit,
      subtotal
    }

    setBudgetItems([...budgetItems, item])
    setSelectedFlower('')
    setQuantity(1)
    addToast(`${flower.nome} adicionado ao orçamento`, 'success')
  }

  const removeItem = (id) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id))
  }

  const totalPlants = budgetItems.reduce((sum, item) => sum + item.subtotal, 0)
  const laborCost = currencyTocents(costs.labor) / 100 || 0
  const materialsCost = currencyTocents(costs.materials) / 100 || 0
  const totalCost = totalPlants + laborCost + materialsCost
  const suggestedPrice = totalCost > 0 ? totalCost * 1.4 : 0
  const estimatedProfit = suggestedPrice - totalCost
  const profitMargin = suggestedPrice > 0 ? ((estimatedProfit / suggestedPrice) * 100).toFixed(1) : 0

  const handleSaveBudget = async () => {
    if (!clientData.clientName || budgetItems.length === 0) {
      addToast('Preencha o cliente e adicione pelo menos uma planta', 'error')
      return
    }

    try {
      setLoading(true)
      
      const budgetData = {
        clienteNome: clientData.clientName,
        descricao: `Projeto ${clientData.projectType} - ${budgetItems.length} itens`,
        totalCents: Math.round(suggestedPrice * 100),
        status: 'pendente',
        itens: budgetItems.map(item => ({
          descricao: item.flowerName,
          quantidade: item.quantity,
          precoCents: Math.round(item.saleUnit * 100)
        }))
      }

      const response = await budgetApi.create(budgetData)
      
      addToast(`Orçamento para ${clientData.clientName} salvo! Valor: R$ ${suggestedPrice.toFixed(2)}`, 'success')
      notifyDataChanged('orcamentos')
      
      setClientData({ clientName: '', projectType: 'residential' })
      setBudgetItems([])
      setCosts({ materials: '', labor: '' })
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Erro ao salvar orçamento'), 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-file-invoice-dollar"></i>
            Construtor de Orçamentos
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client Data */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200">
                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-user text-eden-primary"></i>
                  Dados do Cliente e Projeto
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Nome do Cliente *
                    </label>
                    <input
                      type="text"
                      value={clientData.clientName}
                      onChange={(e) => handleClientSearch(e.target.value)}
                      onFocus={() => clientData.clientName && setShowClientSuggestions(true)}
                      placeholder="Ex: Dra. Sofia"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                    {showClientSuggestions && filteredClients.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-eden-primary rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredClients.map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => selectClient(client)}
                            className="w-full text-left px-4 py-2 hover:bg-eden-primary/10 transition-colors border-b border-stone-100 last:border-b-0"
                          >
                            <div className="font-medium text-stone-900">{client.nome}</div>
                            {client.email && <div className="text-xs text-stone-500">{client.email}</div>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Tipo de Projeto
                    </label>
                    <select
                      name="projectType"
                      value={clientData.projectType}
                      onChange={handleClientChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    >
                      <option value="residential">Residencial</option>
                      <option value="vertical">Jardim Vertical</option>
                      <option value="commercial">Comercial</option>
                      <option value="reform">Reforma & Manutenção</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Add Plants */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200">
                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-leaf text-eden-primary"></i>
                  Adicionar Plantas do Estoque
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Planta
                    </label>
                    <select
                      value={selectedFlower}
                      onChange={(e) => setSelectedFlower(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20 disabled:bg-stone-100"
                    >
                      <option value="">
                        {loading ? 'Carregando...' : '-- Selecione --'}
                      </option>
                      {flowers.map(flower => (
                        <option key={flower.id} value={flower.id}>
                          {flower.nome} - {formatCurrency((flower.precoCents || 0) / 100)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addItem}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <i className="fa-solid fa-plus"></i>
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget Items Table */}
              {budgetItems.length > 0 && (
                <div className="bg-white border-2 border-stone-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-stone-50 border-b border-stone-200">
                    <h3 className="font-bold text-stone-900 flex items-center gap-2">
                      <i className="fa-solid fa-list"></i>
                      Itens do Orçamento ({budgetItems.length})
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-stone-50 border-b border-stone-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-stone-700">Planta</th>
                          <th className="px-4 py-3 text-center font-semibold text-stone-700">Qtd</th>
                          <th className="px-4 py-3 text-right font-semibold text-stone-700">Unit.</th>
                          <th className="px-4 py-3 text-right font-semibold text-stone-700">Subtotal</th>
                          <th className="px-4 py-3 text-center font-semibold text-stone-700">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budgetItems.map(item => (
                          <tr key={item.id} className="border-b border-stone-200 hover:bg-stone-50">
                            <td className="px-4 py-3 text-stone-900">{item.flowerName}</td>
                            <td className="px-4 py-3 text-center text-stone-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-right text-stone-600">{formatCurrency(item.saleUnit)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-eden-primary">{formatCurrency(item.subtotal)}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 transition-colors"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-stone-50 border-t-2 border-stone-200">
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right font-bold text-stone-900">Total de Plantas:</td>
                          <td className="px-4 py-3 text-right font-bold text-lg text-eden-primary">{formatCurrency(totalPlants)}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Costs */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200">
                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-hammer text-eden-primary"></i>
                  Serviços & Mão de Obra
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Insumos (Terra, Adubo, etc) - R$
                    </label>
                    <input
                      type="text"
                      name="materials"
                      value={costs.materials}
                      onChange={handleCostChange}
                      placeholder="0,00"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Mão de Obra / Equipe - R$
                    </label>
                    <input
                      type="text"
                      name="labor"
                      value={costs.labor}
                      onChange={handleCostChange}
                      placeholder="0,00"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="bg-gradient-to-br from-eden-accent-light to-eden-accent p-6 rounded-lg border-2 border-eden-primary h-fit sticky top-20">
              <h3 className="font-bold text-eden-primary text-lg mb-6 flex items-center gap-2">
                <i className="fa-solid fa-calculator"></i>
                Resumo Financeiro
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Plantas:</span>
                  <span className="font-semibold text-stone-900">{formatCurrency(totalPlants)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Insumos:</span>
                  <span className="font-semibold text-stone-900">{formatCurrency(materialsCost)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Mão de Obra:</span>
                  <span className="font-semibold text-stone-900">{formatCurrency(laborCost)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary">
                  <span className="font-semibold text-stone-900">Custo Total:</span>
                  <span className="font-bold text-lg text-stone-900">{formatCurrency(totalCost)}</span>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-stone-600 mb-2">Valor Final Sugerido (40% markup):</p>
                  <p className="text-3xl font-bold text-eden-primary">{formatCurrency(suggestedPrice)}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-stone-600 mb-2">Lucro Estimado:</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(estimatedProfit)}</p>
                  <p className="text-xs text-stone-600 mt-1">Margem: {profitMargin}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveBudget}
              disabled={loading || budgetItems.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i className="fa-solid fa-check"></i>
              {loading ? 'Salvando...' : 'Finalizar & Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useToast } from '../ToastContext'

export function BudgetBuilderModal({ isOpen, onClose, flowers = [] }) {
  const { addToast } = useToast()
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

  const handleClientChange = (e) => {
    const { name, value } = e.target
    setClientData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCostChange = (e) => {
    const { name, value } = e.target
    setCosts(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addItem = () => {
    if (!selectedFlower || quantity < 1) {
      addToast('Selecione uma planta e quantidade válida', 'error')
      return
    }

    const flower = flowers.find(f => f.id === parseInt(selectedFlower))
    const item = {
      id: Date.now(),
      flower: flower.name,
      quantity,
      costUnit: flower.price,
      saleUnit: flower.price * 1.5,
      subtotal: flower.price * 1.5 * quantity
    }

    setBudgetItems([...budgetItems, item])
    setSelectedFlower('')
    setQuantity(1)
    addToast(`${flower.name} adicionado ao orçamento`, 'success')
  }

  const removeItem = (id) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id))
  }

  const totalMaterials = budgetItems.reduce((sum, item) => sum + item.subtotal, 0)
  const laborCost = parseFloat(costs.labor) || 0
  const materialsCost = parseFloat(costs.materials) || 0
  const totalCost = totalMaterials + laborCost + materialsCost
  const suggestedPrice = totalCost * 1.4
  const estimatedProfit = suggestedPrice - totalCost
  const profitMargin = suggestedPrice > 0 ? ((estimatedProfit / suggestedPrice) * 100).toFixed(1) : 0

  const handleSaveBudget = () => {
    if (!clientData.clientName || budgetItems.length === 0) {
      addToast('Preencha o cliente e adicione pelo menos uma planta', 'error')
      return
    }

    addToast(`Orçamento para ${clientData.clientName} salvo! Valor: R$ ${suggestedPrice.toFixed(2)}`, 'success')
    
    setClientData({ clientName: '', projectType: 'residential' })
    setBudgetItems([])
    setCosts({ materials: '', labor: '' })
    onClose()
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
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Nome do Cliente *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={clientData.clientName}
                      onChange={handleClientChange}
                      placeholder="Ex: Dra. Sofia"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
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
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    >
                      <option value="">-- Selecione --</option>
                      {flowers.map(flower => (
                        <option key={flower.id} value={flower.id}>
                          {flower.name} - R$ {flower.price.toFixed(2)}
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
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addItem}
                      className="w-full px-4 py-3 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-semibold flex items-center justify-center gap-2"
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
                    <h3 className="font-bold text-stone-900">Itens do Orçamento</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-stone-50 border-b border-stone-200">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-stone-700">Planta</th>
                          <th className="px-4 py-2 text-center font-semibold text-stone-700">Qtd</th>
                          <th className="px-4 py-2 text-right font-semibold text-stone-700">Unit.</th>
                          <th className="px-4 py-2 text-right font-semibold text-stone-700">Subtotal</th>
                          <th className="px-4 py-2 text-center font-semibold text-stone-700">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budgetItems.map(item => (
                          <tr key={item.id} className="border-b border-stone-200 hover:bg-stone-50">
                            <td className="px-4 py-3 text-stone-900">{item.flower}</td>
                            <td className="px-4 py-3 text-center text-stone-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-right text-stone-600">R$ {item.saleUnit.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-eden-primary">R$ {item.subtotal.toFixed(2)}</td>
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
                      type="number"
                      name="materials"
                      value={costs.materials}
                      onChange={handleCostChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Mão de Obra / Equipe - R$
                    </label>
                    <input
                      type="number"
                      name="labor"
                      value={costs.labor}
                      onChange={handleCostChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="bg-gradient-to-br from-eden-accent-light to-eden-accent p-6 rounded-lg border-2 border-eden-primary h-fit sticky top-0">
              <h3 className="font-bold text-eden-primary text-lg mb-6 flex items-center gap-2">
                <i className="fa-solid fa-calculator"></i>
                Resumo Financeiro
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Plantas:</span>
                  <span className="font-semibold text-stone-900">R$ {totalMaterials.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Insumos:</span>
                  <span className="font-semibold text-stone-900">R$ {materialsCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary/30">
                  <span className="text-stone-700">Mão de Obra:</span>
                  <span className="font-semibold text-stone-900">R$ {laborCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3 border-b-2 border-eden-primary">
                  <span className="font-semibold text-stone-900">Custo Total:</span>
                  <span className="font-bold text-lg text-stone-900">R$ {totalCost.toFixed(2)}</span>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-stone-600 mb-2">Valor Final Sugerido:</p>
                  <p className="text-3xl font-bold text-eden-primary">R$ {suggestedPrice.toFixed(2)}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="text-xs text-stone-600 mb-2">Lucro Estimado:</p>
                  <p className="text-2xl font-bold text-green-600">R$ {estimatedProfit.toFixed(2)}</p>
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
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveBudget}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-check"></i>
              Finalizar & Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

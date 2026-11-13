import React, { useState, useEffect } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'

export default function CreateNFeModal() {
  const { closeModal } = useModal()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clienteId: '',
    dataEmissao: new Date().toISOString().split('T')[0],
    itens: [{ produtoId: '', descricao: '', quantidade: 1, valorUnitarioCents: 0, ncm: '', cfop: '5102' }]
  })

  const handleAddItem = () => {
    setFormData({
      ...formData,
      itens: [...formData.itens, { produtoId: '', descricao: '', quantidade: 1, valorUnitarioCents: 0, ncm: '', cfop: '5102' }]
    })
  }

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index)
    })
  }

  const handleItemChange = (index, field, value) => {
    const newItens = [...formData.itens]
    newItens[index][field] = field === 'quantidade' || field === 'valorUnitarioCents' ? parseFloat(value) || 0 : value
    setFormData({ ...formData, itens: newItens })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.clienteId) {
      addToast('Selecione um cliente', 'error')
      return
    }
    if (formData.itens.length === 0) {
      addToast('Adicione pelo menos um item', 'error')
      return
    }

    setLoading(true)
    try {
      await fiscalApi.createNFe({
        clienteId: formData.clienteId,
        dataEmissao: formData.dataEmissao,
        itens: formData.itens.map(item => ({
          produtoId: item.produtoId,
          descricao: item.descricao,
          quantidade: item.quantidade,
          valorUnitarioCents: Math.round(item.valorUnitarioCents * 100),
          ncm: item.ncm,
          cfop: item.cfop
        }))
      })
      addToast('NF-e criada com sucesso', 'success')
      window.dispatchEvent(new Event('eden:data-changed'))
      closeModal()
    } catch (error) {
      addToast(error.response?.data?.detail || 'Erro ao criar NF-e', 'error')
    } finally {
      setLoading(false)
    }
  }

  const totalValue = formData.itens.reduce((sum, item) => sum + (item.quantidade * item.valorUnitarioCents), 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-eden-primary mb-6">Nova Nota Fiscal</h2>

        <form onSubmit={handleSubmit}>
          {/* Cliente */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Cliente *</label>
            <input
              type="text"
              value={formData.clienteId}
              onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
              placeholder="ID do cliente"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              required
            />
          </div>

          {/* Data */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Data de Emissão</label>
            <input
              type="date"
              value={formData.dataEmissao}
              onChange={(e) => setFormData({ ...formData, dataEmissao: e.target.value })}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
            />
          </div>

          {/* Itens */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-700">Itens</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-1 bg-eden-primary text-white rounded text-sm hover:bg-eden-light transition-colors"
              >
                <i className="fa-solid fa-plus mr-1"></i>
                Adicionar Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.itens.map((item, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Descrição *</label>
                      <input
                        type="text"
                        value={item.descricao}
                        onChange={(e) => handleItemChange(index, 'descricao', e.target.value)}
                        placeholder="Descrição do produto"
                        className="w-full px-3 py-2 border border-stone-200 rounded text-sm focus:outline-none focus:border-eden-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Quantidade *</label>
                      <input
                        type="number"
                        value={item.quantidade}
                        onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                        min="0.01"
                        step="0.01"
                        className="w-full px-3 py-2 border border-stone-200 rounded text-sm focus:outline-none focus:border-eden-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Valor Unitário *</label>
                      <input
                        type="number"
                        value={item.valorUnitarioCents}
                        onChange={(e) => handleItemChange(index, 'valorUnitarioCents', e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-stone-200 rounded text-sm focus:outline-none focus:border-eden-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">NCM</label>
                      <input
                        type="text"
                        value={item.ncm}
                        onChange={(e) => handleItemChange(index, 'ncm', e.target.value)}
                        placeholder="00000000"
                        maxLength="8"
                        className="w-full px-3 py-2 border border-stone-200 rounded text-sm focus:outline-none focus:border-eden-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">CFOP</label>
                      <input
                        type="text"
                        value={item.cfop}
                        onChange={(e) => handleItemChange(index, 'cfop', e.target.value)}
                        placeholder="5102"
                        maxLength="4"
                        className="w-full px-3 py-2 border border-stone-200 rounded text-sm focus:outline-none focus:border-eden-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-eden-primary">
                      Subtotal: R$ {(item.quantidade * item.valorUnitarioCents).toFixed(2)}
                    </p>
                    {formData.itens.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
            <p className="text-sm text-stone-600">Valor Total</p>
            <p className="text-2xl font-bold text-eden-primary">R$ {totalValue.toFixed(2)}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 border-2 border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar NF-e'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

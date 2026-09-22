import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, notifyDataChanged, supplierApi } from '../services/api'

export function EditSupplierModal({ isOpen, onClose, supplier }) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    active: true
  })

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.nome || '',
        email: supplier.email || '',
        phone: supplier.telefone || '',
        address: supplier.endereco || '',
        category: supplier.categoria || '',
        active: supplier.ativo !== false
      })
    }
  }, [supplier, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      addToast('Preencha os campos obrigatórios', 'error')
      return
    }

    try {
      await supplierApi.update({
        id: supplier.id,
        nome: formData.name,
        email: formData.email,
        telefone: formData.phone,
        endereco: formData.address,
        categoria: formData.category,
        ativo: formData.active
      })
      addToast(`Fornecedor "${formData.name}" atualizado com sucesso!`, 'success')
      notifyDataChanged('fornecedores')
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível atualizar o fornecedor.'), 'error')
    }
  }

  if (!isOpen || !supplier) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-edit"></i>
            Editar Fornecedor
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
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Ex: Flores, Plantas, Insumos"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-stone-300 text-eden-primary focus:ring-eden-primary"
                />
                <label htmlFor="active" className="text-sm font-semibold text-stone-700">
                  Fornecedor Ativo
                </label>
              </div>
            </div>
          </div>

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

import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'

export function EditMaintenanceModal({ isOpen, onClose, maintenanceData = {} }) {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    client: '',
    service: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'normal',
    status: 'scheduled',
    team: '',
    notes: ''
  })

  useEffect(() => {
    if (maintenanceData && maintenanceData.id) {
      setFormData({
        client: maintenanceData.client || '',
        service: maintenanceData.service || '',
        date: maintenanceData.date ? new Date(maintenanceData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        priority: maintenanceData.priority || 'normal',
        status: maintenanceData.status || 'scheduled',
        team: maintenanceData.team || '',
        notes: maintenanceData.notes || ''
      })
    }
  }, [maintenanceData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.client || !formData.service || !formData.date) {
      showToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    showToast(`Manutenção para ${formData.client} atualizada com sucesso!`, 'success')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-wrench"></i>
            Editar Manutenção
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
                  Cliente *
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Ex: Condomínio Verde"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Serviço *
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Ex: Poda de Plantas"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Equipe
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Ex: João, Maria"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Prioridade
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="low">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="scheduled">Agendado</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Observações
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Adicione observações sobre a manutenção..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
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

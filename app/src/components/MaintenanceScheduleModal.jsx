import React, { useState } from 'react'
import { useToast } from '../ToastContext'

export function MaintenanceScheduleModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    clientName: '',
    serviceValue: '',
    frequency: 'monthly',
    scheduledDate: '',
    team: '',
    observations: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.clientName || !formData.serviceValue || !formData.scheduledDate || !formData.team) {
      addToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    const frequencyLabel = {
      weekly: 'Semanal',
      biweekly: 'Quinzenal',
      monthly: 'Mensal',
      quarterly: 'Trimestral',
      custom: 'Avulsa'
    }[formData.frequency]

    addToast(`Manutenção agendada para ${formData.clientName} - ${frequencyLabel} - R$ ${parseFloat(formData.serviceValue).toFixed(2)}`, 'success')
    
    setFormData({
      clientName: '',
      serviceValue: '',
      frequency: 'monthly',
      scheduledDate: '',
      team: '',
      observations: ''
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
            <i className="fa-solid fa-calendar-check"></i>
            Agendar Manutenção
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
                  Nome do Cliente/Residência *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Ex: Condomínio Verde"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Valor do Serviço (R$) *
                </label>
                <input
                  type="number"
                  name="serviceValue"
                  value={formData.serviceValue}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Frequência *
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quinzenal</option>
                  <option value="monthly">Mensal</option>
                  <option value="quarterly">Trimestral</option>
                  <option value="custom">Avulsa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Data Agendada *
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Equipe Responsável *
                </label>
                <select
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="">-- Selecione a equipe --</option>
                  <option value="carlos">Carlos</option>
                  <option value="maria">Maria</option>
                  <option value="joao">João</option>
                  <option value="ana">Ana</option>
                  <option value="team_a">Equipe A</option>
                  <option value="team_b">Equipe B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Observações Técnicas
                </label>
                <textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Ex: Poda de rosas, adubação, irrigação..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20 resize-none"
                />
              </div>

              {/* Service Summary */}
              <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm mb-3">Resumo do Serviço</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Valor Mensal:</span>
                    <span className="font-semibold text-eden-primary">
                      R$ {(parseFloat(formData.serviceValue) || 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-stone-600">Frequência:</span>
                    <span className="font-semibold text-stone-900">
                      {formData.frequency === 'weekly' ? 'Semanal' :
                       formData.frequency === 'biweekly' ? 'Quinzenal' :
                       formData.frequency === 'monthly' ? 'Mensal' :
                       formData.frequency === 'quarterly' ? 'Trimestral' : 'Avulsa'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-200">
                    <span className="text-stone-600 font-semibold">Receita Anual Est.:</span>
                    <span className="font-bold text-green-600">
                      R$ {(parseFloat(formData.serviceValue) * 12 || 0).toFixed(2)}
                    </span>
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
              Agendar Manutenção
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

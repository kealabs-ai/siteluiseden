import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, maintenanceApi, notifyDataChanged, clientsApi } from '../services/api'
import { masks, currencyTocents } from '../utils/inputMasks'

export function EditMaintenanceModal({ isOpen, onClose, maintenanceData = {} }) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    clientName: '',
    serviceValue: '',
    frequency: 'monthly',
    scheduledDate: '',
    priority: 'normal',
    team: '',
    observations: '',
    status: 'agendada'
  })
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadClients()
      if (maintenanceData && maintenanceData.id) {
        setFormData({
          clientName: maintenanceData.titulo || '',
          serviceValue: maintenanceData.valorCents ? (maintenanceData.valorCents / 100).toFixed(2).replace('.', ',') : '',
          frequency: maintenanceData.frequencia || 'monthly',
          scheduledDate: maintenanceData.dataAgendada ? new Date(maintenanceData.dataAgendada).toISOString().split('T')[0] : '',
          priority: maintenanceData.prioridade || 'normal',
          team: maintenanceData.equipe || '',
          observations: maintenanceData.descricao || '',
          status: maintenanceData.status || 'agendada'
        })
      }
    }
  }, [maintenanceData, isOpen])

  const loadClients = async () => {
    try {
      const { data } = await clientsApi.list()
      setClients(data || [])
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  const handleClientSearch = (value) => {
    setFormData(prev => ({
      ...prev,
      clientName: value
    }))

    if (value.length > 0) {
      const filtered = clients.filter(client =>
        (client.nome || '').toLowerCase().includes(value.toLowerCase()) ||
        (client.endereco || '').toLowerCase().includes(value.toLowerCase())
      )
      setFilteredClients(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredClients([])
      setShowSuggestions(false)
    }
  }

  const selectClient = (client) => {
    setFormData(prev => ({
      ...prev,
      clientName: client.nome || ''
    }))
    setShowSuggestions(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'serviceValue') {
      maskedValue = masks.currency(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.clientName || !formData.serviceValue || !formData.scheduledDate || !formData.team) {
      addToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    try {
      await maintenanceApi.update({
        id: maintenanceData.id,
        titulo: formData.clientName,
        descricao: formData.observations,
        dataAgendada: new Date(formData.scheduledDate).toISOString(),
        status: formData.status,
        prioridade: formData.priority,
        frequencia: formData.frequency,
        valorCents: currencyTocents(formData.serviceValue),
        equipe: formData.team
      })
      addToast(`Manutenção para ${formData.clientName} atualizada com sucesso!`, 'success')
      notifyDataChanged('manutencao')
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível atualizar a manutenção.'), 'error')
    }
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
              <div className="relative">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Nome do Cliente/Residência *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleClientSearch(e.target.value)}
                  onFocus={() => formData.clientName && setShowSuggestions(true)}
                  placeholder="Ex: Condomínio Verde"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
                {showSuggestions && filteredClients.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-eden-primary rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => selectClient(client)}
                        className="w-full text-left px-4 py-2 hover:bg-eden-primary/10 transition-colors border-b border-stone-100 last:border-b-0"
                      >
                        <div className="font-medium text-stone-900">{client.nome}</div>
                        {client.endereco && <div className="text-xs text-stone-500">{client.endereco}</div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Valor do Serviço (R$) *
                </label>
                <input
                  type="text"
                  name="serviceValue"
                  value={formData.serviceValue}
                  onChange={handleChange}
                  placeholder="0,00"
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Prioridade *
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
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary focus:ring-2 focus:ring-eden-primary/20"
                >
                  <option value="agendada">Agendada</option>
                  <option value="em_progresso">Em Progresso</option>
                  <option value="concluida">Concluída</option>
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
                    <span className="text-stone-600">Valor Serviço:</span>
                    <span className="font-semibold text-eden-primary">
                      R$ {(currencyTocents(formData.serviceValue) / 100 || 0).toFixed(2)}
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
                      R$ {(currencyTocents(formData.serviceValue) / 100 * 12 || 0).toFixed(2)}
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

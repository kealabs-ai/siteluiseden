import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'

export default function MaintenanceSchedule() {
  const [schedules] = useState([
    { id: 1, client: 'Condomínio Verde', service: 'Poda de Plantas', date: '2025-01-20', status: 'scheduled', priority: 'normal' },
    { id: 2, client: 'Empresa Tech', service: 'Irrigação Automática', date: '2025-01-18', status: 'completed', priority: 'high' },
    { id: 3, client: 'Casa Moderna', service: 'Adubação', date: '2025-01-22', status: 'scheduled', priority: 'normal' },
    { id: 4, client: 'Restaurante Flores', service: 'Limpeza de Folhas', date: '2025-01-17', status: 'in_progress', priority: 'high' },
    { id: 5, client: 'Casamento Silva', service: 'Manutenção Pós-Evento', date: '2025-01-16', status: 'completed', priority: 'normal' }
  ])

  const { openModal } = useModal()

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'normal': return 'bg-stone-100 text-stone-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'scheduled': return 'Agendado'
      case 'in_progress': return 'Em Progresso'
      case 'completed': return 'Concluído'
      default: return 'Desconhecido'
    }
  }

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'Alta'
      case 'normal': return 'Normal'
      case 'low': return 'Baixa'
      default: return 'Desconhecida'
    }
  }

  const scheduledCount = schedules.filter(s => s.status === 'scheduled').length
  const inProgressCount = schedules.filter(s => s.status === 'in_progress').length
  const completedCount = schedules.filter(s => s.status === 'completed').length

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Manutenção</h1>
          <p className="text-stone-600 mt-1">Gerencie agendamentos de manutenção</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Tarefas</h3>
              <i className="fa-solid fa-tasks text-blue-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">{schedules.length}</p>
            <p className="text-xs text-stone-500 mt-2">Tarefas</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Agendadas</h3>
              <i className="fa-solid fa-calendar text-blue-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-blue-600">{scheduledCount}</p>
            <p className="text-xs text-stone-500 mt-2">Próximas</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Em Progresso</h3>
              <i className="fa-solid fa-spinner text-yellow-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{inProgressCount}</p>
            <p className="text-xs text-stone-500 mt-2">Executando</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Concluídas</h3>
              <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
            <p className="text-xs text-stone-500 mt-2">Finalizadas</p>
          </div>
        </div>

        {/* Maintenance Schedule Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Cronograma de Manutenção</h2>
            <button onClick={() => openModal('maintenanceSchedule')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
              <i className="fa-solid fa-plus mr-2"></i>
              Agendar Manutenção
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Serviço</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Prioridade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">#{schedule.id}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{schedule.client}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{schedule.service}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{new Date(schedule.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(schedule.priority)}`}>
                        <i className={`fa-solid ${schedule.priority === 'high' ? 'fa-exclamation' : 'fa-circle'}`}></i>
                        {getPriorityLabel(schedule.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        <i className={`fa-solid ${
                          schedule.status === 'scheduled' ? 'fa-calendar' :
                          schedule.status === 'in_progress' ? 'fa-spinner' :
                          'fa-check'
                        }`}></i>
                        {getStatusLabel(schedule.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => openModal('editMaintenance', schedule)} className="text-eden-primary hover:text-eden-light transition-colors mr-3">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-700 transition-colors">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

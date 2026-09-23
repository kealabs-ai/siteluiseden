import React, { useState, useEffect } from 'react'
import { maintenanceApi, getApiError } from '../services/api'
import { useToast } from '../ToastContext'

export function MaintenanceKanbanModal({ isOpen, onClose, schedules = [] }) {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (isOpen) {
      setTasks(schedules)
    }
  }, [isOpen, schedules])

  const columns = [
    { id: 'scheduled', title: 'Agendado', color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', borderColor: 'border-blue-300', badgeColor: 'bg-blue-100 text-blue-800', icon: 'fa-calendar' },
    { id: 'in_progress', title: 'Em Execução', color: 'from-yellow-500 to-yellow-600', bgLight: 'bg-yellow-50', borderColor: 'border-yellow-300', badgeColor: 'bg-yellow-100 text-yellow-800', icon: 'fa-spinner' },
    { id: 'paused', title: 'Pausado', color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', borderColor: 'border-orange-300', badgeColor: 'bg-orange-100 text-orange-800', icon: 'fa-pause' },
    { id: 'completed', title: 'Concluído', color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', borderColor: 'border-green-300', badgeColor: 'bg-green-100 text-green-800', icon: 'fa-check' }
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const handleDragStart = (e, task) => {
    setDraggedItem(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, newStatus) => {
    e.preventDefault()
    if (!draggedItem) return

    try {
      setLoading(true)
      const statusMap = {
        'scheduled': 'agendada',
        'in_progress': 'em_progresso',
        'paused': 'pausada',
        'completed': 'concluida'
      }
      await maintenanceApi.update({
        id: draggedItem.id,
        status: statusMap[newStatus] || newStatus
      })
      
      setTasks(tasks.map(task =>
        task.id === draggedItem.id ? { ...task, status: newStatus } : task
      ))
      
      addToast('Status atualizado com sucesso!', 'success')
    } catch (error) {
      addToast(getApiError(error, 'Erro ao atualizar status'), 'error')
    } finally {
      setLoading(false)
      setDraggedItem(null)
    }
  }

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return 'fa-exclamation text-red-600'
      case 'normal': return 'fa-minus text-stone-400'
      case 'low': return 'fa-check text-green-600'
      default: return 'fa-circle text-stone-400'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      <div className="bg-white rounded-none shadow-none w-screen h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-eden-primary via-eden-light to-eden-accent px-12 py-8 flex items-center justify-between border-b-4 border-eden-primary">
          <div className="flex items-center gap-6">
            <img src="/assets/logotipo-eden.png" alt="Luis Eden" className="h-20 w-auto object-contain" />
            <div className="border-l-2 border-white/30 pl-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-lg">
                  <i className="fa-solid fa-kanban text-white text-3xl"></i>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Kanban de Manutenção</h2>
                  <p className="text-white/80 text-base mt-2">Arraste os cards para alterar o status das tarefas</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-4 transition-colors hover:scale-110 transform"
          >
            <i className="fa-solid fa-times text-3xl"></i>
          </button>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto p-12 bg-gradient-to-br from-stone-50 to-stone-100">
          <div className="flex gap-10 min-w-max h-full mx-auto justify-center">
            {columns.map(column => {
              const columnTasks = getTasksByStatus(column.id)
              return (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-96 flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white border-2 border-stone-200"
                >
                  {/* Column Header */}
                  <div className={`bg-gradient-to-r ${column.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${column.icon} text-2xl`}></i>
                        <h3 className="font-bold text-xl">{column.title}</h3>
                      </div>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 text-white text-sm font-bold">
                        {columnTasks.length}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">{columnTasks.length} {columnTasks.length === 1 ? 'tarefa' : 'tarefas'}</p>
                  </div>

                  {/* Tasks Container */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                    className={`flex-1 overflow-y-auto p-4 space-y-3 ${column.bgLight}`}
                  >
                    {columnTasks.length > 0 ? (
                      columnTasks.map(task => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          className="bg-white rounded-xl p-4 border-2 border-stone-200 cursor-move hover:shadow-lg hover:border-eden-primary transition-all transform hover:scale-105 hover:-translate-y-1"
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-3">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${column.badgeColor}`}>
                              #{task.id}
                            </span>
                            <i className={`fa-solid ${getPriorityIcon(task.priority)}`}></i>
                          </div>

                          {/* Task Title */}
                          <h4 className="font-bold text-stone-900 mb-2 text-sm line-clamp-2">{task.client}</h4>

                          {/* Task Description */}
                          <p className="text-xs text-stone-600 mb-3 line-clamp-2 bg-stone-50 p-2 rounded">{task.service}</p>

                          {/* Task Date */}
                          <div className="flex items-center gap-2 text-xs text-stone-600 mb-3 pb-3 border-b border-stone-200">
                            <i className="fa-solid fa-calendar-days text-eden-primary"></i>
                            <span className="font-medium">{new Date(task.date).toLocaleDateString('pt-BR')}</span>
                          </div>

                          {/* Priority Badge */}
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'normal' ? 'bg-stone-100 text-stone-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              <i className={`fa-solid ${getPriorityIcon(task.priority)}`}></i>
                              {task.priority === 'high' ? 'Alta' : task.priority === 'normal' ? 'Normal' : 'Baixa'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <i className="fa-solid fa-inbox text-5xl mb-3 opacity-20"></i>
                          <p className="text-stone-400 font-medium">Nenhuma tarefa</p>
                          <p className="text-stone-300 text-xs mt-1">Arraste tarefas aqui</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-stone-50 to-stone-100 border-t-2 border-stone-200 px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-stone-600">
            <i className="fa-solid fa-lightbulb text-yellow-500 text-xl"></i>
            <p className="text-base"><span className="font-semibold">Dica:</span> Arraste os cards entre as colunas para alterar o status das tarefas</p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2 text-lg"
          >
            <i className="fa-solid fa-check"></i>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

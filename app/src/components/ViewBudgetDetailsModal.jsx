import React from 'react'
import { useToast } from '../ToastContext'

export function ViewBudgetDetailsModal({ isOpen, onClose, budgetData = {} }) {
  const { showToast } = useToast()

  if (!isOpen) return null

  const handleApprove = () => {
    showToast('Orçamento aprovado com sucesso', 'success')
    onClose()
  }

  const handleReject = () => {
    showToast('Orçamento rejeitado', 'info')
    onClose()
  }

  const handleSendToClient = () => {
    showToast('Orçamento enviado ao cliente', 'success')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light px-6 py-4 flex items-center justify-between border-b border-stone-200">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-file-invoice-dollar"></i>
            Orçamento #{budgetData.id}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Budget Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Cliente</p>
              <p className="text-lg font-bold text-stone-900">{budgetData.client}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Data</p>
              <p className="text-lg font-bold text-stone-900">
                {budgetData.date ? new Date(budgetData.date).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-stone-500 uppercase font-semibold">Projeto</p>
              <p className="text-lg font-bold text-stone-900">{budgetData.project}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gradient-to-r from-eden-accent-light to-eden-accent rounded-lg p-4">
            <p className="text-sm text-stone-600 mb-1">Valor do Orçamento</p>
            <p className="text-3xl font-bold text-eden-primary">
              R$ {budgetData.amount ? budgetData.amount.toFixed(2) : '0.00'}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-stone-500 uppercase font-semibold mb-2">Status</p>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              budgetData.status === 'approved' ? 'bg-green-100 text-green-800' :
              budgetData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <i className={`fa-solid ${
                budgetData.status === 'approved' ? 'fa-check' :
                budgetData.status === 'pending' ? 'fa-clock' :
                'fa-times'
              }`}></i>
              {budgetData.status === 'approved' ? 'Aprovado' :
               budgetData.status === 'pending' ? 'Pendente' :
               'Rejeitado'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            {budgetData.status === 'pending' && (
              <>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-check"></i>
                  Aprovar
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-times"></i>
                  Rejeitar
                </button>
              </>
            )}
            <button
              onClick={handleSendToClient}
              className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-envelope"></i>
              Enviar
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

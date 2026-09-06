import React from 'react'
import { useToast } from '../ToastContext'

export function ViewSaleDetailsModal({ isOpen, onClose, saleData = {} }) {
  const { showToast } = useToast()

  if (!isOpen) return null

  const handlePrint = () => {
    showToast('Impressão iniciada', 'success')
  }

  const handleEmail = () => {
    showToast('Venda enviada por email', 'success')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light px-6 py-4 flex items-center justify-between border-b border-stone-200">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-receipt"></i>
            Detalhes da Venda #{saleData.id}
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
          {/* Sale Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Cliente</p>
              <p className="text-lg font-bold text-stone-900">{saleData.client}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Data</p>
              <p className="text-lg font-bold text-stone-900">
                {saleData.date ? new Date(saleData.date).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Produto</p>
              <p className="text-lg font-bold text-stone-900">{saleData.product}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Pagamento</p>
              <p className="text-lg font-bold text-stone-900">{saleData.payment}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gradient-to-r from-eden-accent-light to-eden-accent rounded-lg p-4">
            <p className="text-sm text-stone-600 mb-1">Valor Total</p>
            <p className="text-3xl font-bold text-eden-primary">
              R$ {saleData.amount ? saleData.amount.toFixed(2) : '0.00'}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-stone-500 uppercase font-semibold mb-2">Status</p>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              saleData.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              <i className={`fa-solid ${saleData.status === 'completed' ? 'fa-check' : 'fa-clock'}`}></i>
              {saleData.status === 'completed' ? 'Concluída' : 'Pendente'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-print"></i>
              Imprimir
            </button>
            <button
              onClick={handleEmail}
              className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-envelope"></i>
              Email
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

import React from 'react'

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar', isDangerous = false }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className={`p-6 flex items-center justify-between ${isDangerous ? 'bg-red-50 border-b-2 border-red-200' : 'bg-stone-50 border-b-2 border-stone-200'}`}>
          <h2 className={`text-lg font-bold flex items-center gap-2 ${isDangerous ? 'text-red-700' : 'text-stone-900'}`}>
            <i className={`fa-solid ${isDangerous ? 'fa-exclamation-triangle' : 'fa-question-circle'}`}></i>
            {title}
          </h2>
        </div>

        <div className="p-6">
          <p className="text-stone-700 mb-6">{message}</p>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 ${
                isDangerous
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gradient-to-r from-eden-primary to-eden-light hover:from-eden-light hover:to-eden-primary'
              }`}
            >
              <i className={`fa-solid ${isDangerous ? 'fa-trash' : 'fa-check'}`}></i>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

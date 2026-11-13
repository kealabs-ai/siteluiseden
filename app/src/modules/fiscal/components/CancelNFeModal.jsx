import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'

export default function CancelNFeModal({ nfe }) {
  const { closeModal } = useModal()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [justificativa, setJustificativa] = useState('')

  if (!nfe) return null

  const handleCancel = async () => {
    if (!justificativa.trim()) {
      addToast('Informe uma justificativa para o cancelamento', 'error')
      return
    }

    setLoading(true)
    try {
      await fiscalApi.cancelNFe(nfe.id, justificativa)
      addToast('Cancelamento enviado para SEFAZ', 'success')
      window.dispatchEvent(new Event('eden:data-changed'))
      closeModal()
    } catch (error) {
      addToast(error.response?.data?.detail || 'Erro ao cancelar NF-e', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Cancelar NF-e</h2>

        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-900">
            <i className="fa-solid fa-exclamation-triangle mr-2"></i>
            Esta ação não pode ser desfeita. O cancelamento será enviado para a SEFAZ.
          </p>
        </div>

        <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-xs text-stone-600 font-semibold mb-2">NF-e</p>
          <p className="text-lg font-bold text-stone-900">#{nfe.numero}</p>
          <p className="text-sm text-stone-600 mt-2">
            Valor: R$ {(nfe.valorTotalCents / 100).toFixed(2)}
          </p>
          {nfe.protocolo && (
            <p className="text-sm text-stone-600 mt-2">
              Protocolo: {nfe.protocolo}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-stone-700 mb-2">
            Justificativa do Cancelamento *
          </label>
          <textarea
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            placeholder="Informe o motivo do cancelamento..."
            rows="4"
            className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-red-600 resize-none"
            required
          />
          <p className="text-xs text-stone-500 mt-1">
            {justificativa.length}/500 caracteres
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={closeModal}
            disabled={loading}
            className="px-6 py-2 border-2 border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium disabled:opacity-50"
          >
            Manter
          </button>
          <button
            onClick={handleCancel}
            disabled={loading || !justificativa.trim()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Cancelando...
              </>
            ) : (
              <>
                <i className="fa-solid fa-ban mr-2"></i>
                Cancelar NF-e
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

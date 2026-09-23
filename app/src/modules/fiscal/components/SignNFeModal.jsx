import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'

export default function SignNFeModal({ nfe }) {
  const { closeModal } = useModal()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!nfe) return null

  const handleSign = async () => {
    setLoading(true)
    try {
      await fiscalApi.signNFe(nfe.id)
      addToast('NF-e assinada com sucesso', 'success')
      window.dispatchEvent(new Event('eden:data-changed'))
      closeModal()
    } catch (error) {
      addToast(error.response?.data?.detail || 'Erro ao assinar NF-e', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-eden-primary mb-4">Assinar NF-e</h2>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <i className="fa-solid fa-info-circle mr-2"></i>
            A NF-e será assinada digitalmente com seu certificado digital.
          </p>
        </div>

        <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-xs text-stone-600 font-semibold mb-2">NF-e</p>
          <p className="text-lg font-bold text-stone-900">#{nfe.numero}</p>
          <p className="text-sm text-stone-600 mt-2">
            Valor: R$ {(nfe.valorTotalCents / 100).toFixed(2)}
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={closeModal}
            disabled={loading}
            className="px-6 py-2 border-2 border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSign}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Assinando...
              </>
            ) : (
              <>
                <i className="fa-solid fa-pen-fancy mr-2"></i>
                Assinar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

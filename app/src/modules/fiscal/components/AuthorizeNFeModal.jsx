import React, { useState } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'

export default function AuthorizeNFeModal({ nfe }) {
  const { closeModal } = useModal()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!nfe) return null

  const handleAuthorize = async () => {
    setLoading(true)
    try {
      const response = await fiscalApi.authorizeNFe(nfe.id)
      addToast('NF-e enviada para autorização', 'success')
      
      // Mostrar número do recibo
      if (response.data.numeroRecibo) {
        addToast(`Recibo: ${response.data.numeroRecibo}`, 'info')
      }
      
      window.dispatchEvent(new Event('eden:data-changed'))
      closeModal()
    } catch (error) {
      addToast(error.response?.data?.detail || 'Erro ao autorizar NF-e', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-eden-primary mb-4">Autorizar NF-e</h2>

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            <i className="fa-solid fa-warning mr-2"></i>
            A NF-e será enviada para a SEFAZ para autorização. Este processo pode levar alguns minutos.
          </p>
        </div>

        <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-xs text-stone-600 font-semibold mb-2">NF-e</p>
          <p className="text-lg font-bold text-stone-900">#{nfe.numero}</p>
          <p className="text-sm text-stone-600 mt-2">
            Valor: R$ {(nfe.valorTotalCents / 100).toFixed(2)}
          </p>
          <p className="text-sm text-stone-600 mt-2">
            Cliente: {nfe.clienteId}
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold mb-2">Próximos Passos</p>
          <ol className="text-sm text-blue-900 space-y-1">
            <li>1. NF-e será enviada para SEFAZ</li>
            <li>2. Você receberá um número de recibo</li>
            <li>3. Consulte o protocolo em alguns minutos</li>
          </ol>
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
            onClick={handleAuthorize}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Enviando...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane mr-2"></i>
                Autorizar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

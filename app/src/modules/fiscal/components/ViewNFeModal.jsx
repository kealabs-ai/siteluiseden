import React from 'react'
import { useModal } from '../../../ModalContext'

export default function ViewNFeModal({ nfe }) {
  const { closeModal } = useModal()

  if (!nfe) return null

  const getStatusColor = (status) => {
    const colors = {
      'rascunho': 'bg-gray-100 text-gray-800',
      'assinada': 'bg-blue-100 text-blue-800',
      'pendente_protocolo': 'bg-yellow-100 text-yellow-800',
      'autorizada': 'bg-green-100 text-green-800',
      'rejeitada': 'bg-red-100 text-red-800',
      'cancelada': 'bg-red-200 text-red-900'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status) => {
    const labels = {
      'rascunho': 'Rascunho',
      'assinada': 'Assinada',
      'pendente_protocolo': 'Pendente Protocolo',
      'autorizada': 'Autorizada',
      'rejeitada': 'Rejeitada',
      'cancelada': 'Cancelada'
    }
    return labels[status] || status
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-eden-primary">Detalhes da NF-e</h2>
          <button
            onClick={closeModal}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* Header Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <div>
            <p className="text-xs text-stone-600 font-semibold">Número</p>
            <p className="text-lg font-bold text-stone-900">#{nfe.numero}</p>
          </div>
          <div>
            <p className="text-xs text-stone-600 font-semibold">Série</p>
            <p className="text-lg font-bold text-stone-900">{nfe.serie}</p>
          </div>
          <div>
            <p className="text-xs text-stone-600 font-semibold">Status</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(nfe.status)}`}>
              {getStatusLabel(nfe.status)}
            </span>
          </div>
          <div>
            <p className="text-xs text-stone-600 font-semibold">Data de Emissão</p>
            <p className="text-lg font-bold text-stone-900">
              {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Chave de Acesso */}
        {nfe.chaveNfe && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-2">Chave de Acesso</p>
            <p className="font-mono text-sm text-blue-900 break-all">{nfe.chaveNfe}</p>
          </div>
        )}

        {/* Protocolo */}
        {nfe.protocolo && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-600 font-semibold mb-2">Protocolo de Autorização</p>
            <p className="font-mono text-sm text-green-900">{nfe.protocolo}</p>
            {nfe.dataAutorizacao && (
              <p className="text-xs text-green-600 mt-2">
                Autorizado em: {new Date(nfe.dataAutorizacao).toLocaleString('pt-BR')}
              </p>
            )}
          </div>
        )}

        {/* Motivo de Rejeição */}
        {nfe.motivoRejeicao && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-600 font-semibold mb-2">Motivo da Rejeição</p>
            <p className="text-sm text-red-900">{nfe.motivoRejeicao}</p>
          </div>
        )}

        {/* Cliente */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Informações do Cliente</h3>
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <p className="text-sm text-stone-600">
              <span className="font-semibold">ID:</span> {nfe.clienteId}
            </p>
          </div>
        </div>

        {/* Itens */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-stone-700 mb-3">Itens</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-stone-700">Descrição</th>
                  <th className="px-4 py-2 text-right font-semibold text-stone-700">Qtd</th>
                  <th className="px-4 py-2 text-right font-semibold text-stone-700">Valor Unit.</th>
                  <th className="px-4 py-2 text-right font-semibold text-stone-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {nfe.itens?.map((item, index) => (
                  <tr key={index} className="border-b border-stone-200">
                    <td className="px-4 py-2 text-stone-600">{item.descricao}</td>
                    <td className="px-4 py-2 text-right text-stone-600">{item.quantidade}</td>
                    <td className="px-4 py-2 text-right text-stone-600">
                      R$ {(item.valorUnitarioCents / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-eden-primary">
                      R$ {(item.valorTotalCents / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totais */}
        <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-stone-600">Valor Total</p>
            <p className="text-2xl font-bold text-eden-primary">
              R$ {(nfe.valorTotalCents / 100).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mb-6 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
          <p>Criado em: {new Date(nfe.createdAt).toLocaleString('pt-BR')}</p>
          <p>Atualizado em: {new Date(nfe.updatedAt).toLocaleString('pt-BR')}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

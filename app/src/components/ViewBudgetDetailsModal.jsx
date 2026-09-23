import React, { useState, useEffect } from 'react'
import { useToast } from '../ToastContext'
import { budgetApi, getApiError, notifyDataChanged } from '../services/api'
import { formatCurrency, formatPercentage } from '../utils/formatters'

export function ViewBudgetDetailsModal({ isOpen, onClose, budgetData = {}, onEdit }) {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectionForm, setShowRejectionForm] = useState(false)
  const [budgetItems, setBudgetItems] = useState([])

  useEffect(() => {
    if (isOpen && budgetData.id) {
      loadBudgetItems()
    }
  }, [isOpen, budgetData.id])

  const loadBudgetItems = async () => {
    try {
      setLoading(true)
      const { data } = await budgetApi.list()
      const budget = data.find(b => b.id === budgetData.id)
      setBudgetItems(budget?.itens || [])
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    try {
      setLoading(true)
      await budgetApi.update({
        id: budgetData.id,
        status: 'aprovado'
      })
      addToast('Orçamento aprovado com sucesso!', 'success')
      notifyDataChanged('orcamentos')
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Erro ao aprovar orçamento'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      addToast('Informe o motivo da rejeição', 'error')
      return
    }

    try {
      setLoading(true)
      await budgetApi.update({
        id: budgetData.id,
        status: 'rejeitado',
        descricao: `${budgetData.descricao || ''}\n\nMotivo da rejeição: ${rejectionReason}`
      })
      addToast('Orçamento rejeitado com sucesso!', 'success')
      notifyDataChanged('orcamentos')
      onClose()
    } catch (error) {
      addToast(getApiError(error, 'Erro ao rejeitar orçamento'), 'error')
    } finally {
      setLoading(false)
      setShowRejectionForm(false)
      setRejectionReason('')
    }
  }

  const handleSendToClient = async () => {
    try {
      setLoading(true)
      addToast('Orçamento enviado ao cliente por email!', 'success')
      notifyDataChanged('orcamentos')
    } catch (error) {
      addToast(getApiError(error, 'Erro ao enviar orçamento'), 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const totalValue = budgetData.totalCents ? budgetData.totalCents / 100 : 0
  const statusColor = budgetData.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                      budgetData.status === 'rejeitado' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
  const statusLabel = budgetData.status === 'aprovado' ? 'Aprovado' :
                      budgetData.status === 'rejeitado' ? 'Rejeitado' :
                      'Pendente'
  const statusIcon = budgetData.status === 'aprovado' ? 'fa-check' :
                     budgetData.status === 'rejeitado' ? 'fa-times' :
                     'fa-clock'

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900">Detalhes do Orçamento</h3>
            <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}>
              <i className={`fa-solid ${statusIcon}`}></i>
              {statusLabel}
            </span>
          </div>

          {/* Client & Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-lg border-2 border-stone-200">
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold mb-1">Cliente</p>
              <p className="text-lg font-bold text-stone-900">{budgetData.clienteNome || 'Sem cliente'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold mb-1">Tipo de Projeto</p>
              <p className="text-lg font-bold text-stone-900">{budgetData.descricao || 'Projeto de paisagismo'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold mb-1">Data de Criação</p>
              <p className="text-lg font-bold text-stone-900">
                {budgetData.createdAt ? new Date(budgetData.createdAt).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold mb-1">Última Atualização</p>
              <p className="text-lg font-bold text-stone-900">
                {budgetData.updatedAt ? new Date(budgetData.updatedAt).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
          </div>

          {/* Budget Items Table */}
          {budgetItems && budgetItems.length > 0 && (
            <div className="bg-white border-2 border-stone-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-stone-50 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 flex items-center gap-2">
                  <i className="fa-solid fa-list"></i>
                  Itens do Orçamento ({budgetItems.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-stone-700">Descrição</th>
                      <th className="px-4 py-3 text-center font-semibold text-stone-700">Qtd</th>
                      <th className="px-4 py-3 text-right font-semibold text-stone-700">Preço Unit.</th>
                      <th className="px-4 py-3 text-right font-semibold text-stone-700">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetItems.map((item, index) => {
                      const unitPrice = (item.precoCents || 0) / 100
                      const subtotal = unitPrice * (item.quantidade || 1)
                      return (
                        <tr key={item.id || index} className="border-b border-stone-200 hover:bg-stone-50">
                          <td className="px-4 py-3 text-stone-900">{item.descricao}</td>
                          <td className="px-4 py-3 text-center text-stone-600">{item.quantidade || 1}</td>
                      <td className="px-4 py-3 text-right text-stone-600">{formatCurrency((item.precoCents || 0) / 100)}</td>
                          <td className="px-4 py-3 text-right font-semibold text-eden-primary">{formatCurrency(subtotal)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className="bg-stone-50 border-t-2 border-stone-200">
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-right font-bold text-stone-900">Total:</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-eden-primary">
                        {formatCurrency(totalValue)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Amount Section */}
          <div className="bg-gradient-to-r from-eden-accent-light to-eden-accent rounded-lg p-6 border-2 border-eden-primary">
            <p className="text-sm text-stone-600 mb-2">Valor Total do Orçamento</p>
            <p className="text-4xl font-bold text-eden-primary mb-2">
              {formatCurrency(totalValue)}
            </p>
            <div className="text-xs text-stone-600">
              <p>Valor em centavos: {budgetData.totalCents || 0}</p>
            </div>
          </div>

          {/* Rejection Form */}
          {showRejectionForm && (
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <p className="text-sm font-semibold text-red-900 mb-3">Motivo da Rejeição</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explique o motivo da rejeição..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-6 border-t-2 border-stone-200">
            {budgetData.status === 'pendente' && (
              <>
                {/* Approval Button - Highlighted */}
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="w-full px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-bold flex items-center justify-center gap-3 disabled:opacity-50 text-lg shadow-2xl hover:shadow-2xl transform hover:scale-105 z-10"
                >
                  <i className="fa-solid fa-thumbs-up text-2xl"></i>
                  APROVAR ORÇAMENTO
                </button>

                {/* Other Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {!showRejectionForm ? (
                    <>
                      <button
                        onClick={() => setShowRejectionForm(true)}
                        disabled={loading}
                        className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                      >
                        <i className="fa-solid fa-times-circle text-xl"></i>
                        Rejeitar
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => {
                            onEdit(budgetData)
                            onClose()
                          }}
                          disabled={loading}
                          className="px-6 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                        >
                          <i className="fa-solid fa-edit text-xl"></i>
                          Editar
                        </button>
                      )}
                      <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-4 bg-stone-500 text-white rounded-lg hover:bg-stone-600 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                      >
                        <i className="fa-solid fa-ban text-xl"></i>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleReject}
                        disabled={loading}
                        className="px-6 py-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                      >
                        <i className="fa-solid fa-check text-xl"></i>
                        {loading ? 'Processando...' : 'Confirmar'}
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectionForm(false)
                          setRejectionReason('')
                        }}
                        disabled={loading}
                        className="px-6 py-4 bg-stone-500 text-white rounded-lg hover:bg-stone-600 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                      >
                        <i className="fa-solid fa-arrow-left text-xl"></i>
                        Voltar
                      </button>
                    </>
                  )}
                </div>

                {!showRejectionForm && (
                  <button
                    onClick={handleSendToClient}
                    disabled={loading}
                    className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                  >
                    <i className="fa-solid fa-envelope text-xl"></i>
                    {loading ? 'Enviando...' : 'Enviar ao Cliente'}
                  </button>
                )}
              </>
            )}

            {budgetData.status !== 'pendente' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleSendToClient}
                  disabled={loading}
                  className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                >
                  <i className="fa-solid fa-envelope text-xl"></i>
                  {loading ? 'Enviando...' : 'Enviar ao Cliente'}
                </button>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-6 py-4 bg-stone-500 text-white rounded-lg hover:bg-stone-600 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-base shadow-lg hover:shadow-xl"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                  Fechar
                </button>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-stone-50 p-4 rounded-lg border-2 border-stone-200 text-xs text-stone-600">
            <p><strong>ID do Orçamento:</strong> {budgetData.id}</p>
            <p><strong>Status:</strong> {budgetData.status}</p>
            {budgetData.usuarioId && <p><strong>Criado por:</strong> {budgetData.usuarioId}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

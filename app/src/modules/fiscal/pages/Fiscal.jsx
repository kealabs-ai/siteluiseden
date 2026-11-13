import React, { useEffect, useState } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'
import './Fiscal.css'

export default function Fiscal() {
  const [nfes, setNfes] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [sefazStatus, setSefazStatus] = useState(null)
  const { addToast } = useToast()
  const { openModal } = useModal()

  const loadNFes = async () => {
    setLoading(true)
    try {
      const { data } = await fiscalApi.listNFe()
      setNfes(data)
    } catch (error) {
      addToast('Erro ao carregar NF-e', 'error')
    } finally {
      setLoading(false)
    }
  }

  const checkSefazStatus = async () => {
    try {
      const { data } = await fiscalApi.statusSefaz()
      setSefazStatus(data)
    } catch (error) {
      setSefazStatus({ status: 'erro', cstat: 'offline' })
    }
  }

  useEffect(() => {
    loadNFes()
    checkSefazStatus()
    const interval = setInterval(checkSefazStatus, 60000) // Verificar a cada minuto
    return () => clearInterval(interval)
  }, [])

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

  const filteredNfes = nfes.filter(nfe => {
    const matchesStatus = statusFilter === 'todos' || nfe.status === statusFilter
    const matchesSearch = !searchTerm || 
      nfe.chaveNfe?.includes(searchTerm) || 
      nfe.numero.toString().includes(searchTerm) ||
      nfe.clienteId?.includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: nfes.length,
    rascunhos: nfes.filter(n => n.status === 'rascunho').length,
    autorizadas: nfes.filter(n => n.status === 'autorizada').length,
    rejeitadas: nfes.filter(n => n.status === 'rejeitada').length,
    canceladas: nfes.filter(n => n.status === 'cancelada').length,
    valorTotal: nfes
      .filter(n => n.status === 'autorizada')
      .reduce((sum, n) => sum + (n.valorTotalCents || 0), 0) / 100
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Gestão Fiscal</h1>
          <p className="text-stone-600 mt-1">Emita e gerencie suas Notas Fiscais Eletrônicas</p>
        </div>

        {/* SEFAZ Status */}
        {sefazStatus && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            sefazStatus.cstat === '107' 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : 'bg-red-50 border-red-500 text-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {sefazStatus.cstat === '107' ? '✓ SEFAZ Online' : '✗ SEFAZ Offline'}
                </p>
                <p className="text-sm mt-1">{sefazStatus.xmotivo}</p>
              </div>
              <button 
                onClick={checkSefazStatus}
                className="px-4 py-2 bg-white rounded hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Atualizar
              </button>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Total NF-e</p>
            <p className="text-2xl font-bold text-eden-primary mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Rascunhos</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">{stats.rascunhos}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Autorizadas</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.autorizadas}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Rejeitadas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejeitadas}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Canceladas</p>
            <p className="text-2xl font-bold text-red-800 mt-1">{stats.canceladas}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-600 font-medium">Valor Total</p>
            <p className="text-2xl font-bold text-eden-primary mt-1">R$ {stats.valorTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* NF-e Table */}
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Notas Fiscais</h2>
            <button 
              onClick={() => openModal('createNFe')}
              className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium"
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Nova NF-e
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-stone-200 bg-stone-50 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Buscar</label>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Chave, número ou cliente..."
                className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              >
                <option value="todos">Todos</option>
                <option value="rascunho">Rascunho</option>
                <option value="assinada">Assinada</option>
                <option value="pendente_protocolo">Pendente Protocolo</option>
                <option value="autorizada">Autorizada</option>
                <option value="rejeitada">Rejeitada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Número</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Chave</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Data</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Protocolo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredNfes.map(nfe => (
                  <tr key={nfe.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">#{nfe.numero}</td>
                    <td className="px-6 py-4 text-sm text-stone-600 font-mono text-xs">
                      {nfe.chaveNfe ? nfe.chaveNfe.substring(0, 8) + '...' : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{nfe.clienteId}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-eden-primary">
                      R$ {(nfe.valorTotalCents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(nfe.status)}`}>
                        {getStatusLabel(nfe.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {nfe.protocolo || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button 
                        onClick={() => openModal('viewNFe', nfe)}
                        className="text-eden-primary hover:text-eden-light transition-colors"
                        title="Visualizar"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {nfe.status === 'rascunho' && (
                        <>
                          <button 
                            onClick={() => openModal('signNFe', nfe)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Assinar"
                          >
                            <i className="fa-solid fa-pen-fancy"></i>
                          </button>
                          <button 
                            onClick={() => openModal('deleteNFe', nfe)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Deletar"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </>
                      )}
                      {nfe.status === 'assinada' && (
                        <button 
                          onClick={() => openModal('authorizeNFe', nfe)}
                          className="text-green-600 hover:text-green-700 transition-colors"
                          title="Autorizar"
                        >
                          <i className="fa-solid fa-paper-plane"></i>
                        </button>
                      )}
                      {nfe.status === 'autorizada' && (
                        <button 
                          onClick={() => openModal('cancelNFe', nfe)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Cancelar"
                        >
                          <i className="fa-solid fa-ban"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredNfes.length === 0 && (
              <p className="p-6 text-center text-stone-600">
                {loading ? 'Carregando...' : 'Nenhuma NF-e encontrada'}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

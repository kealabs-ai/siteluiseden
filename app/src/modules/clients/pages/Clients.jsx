import React, { useEffect, useState } from 'react'
import { useModal } from '../../../ModalContext'
import { clientsApi, getApiError } from '../../../services/api'
import { useToast } from '../../../ToastContext'

export default function Clients() {
  const [clients, setClients] = useState([])
  const { addToast } = useToast()
  const { openModal, openConfirmation } = useModal()
  const [loading, setLoading] = useState(true)

  const loadClients = async () => {
    try {
      const response = await clientsApi.list()
      setClients(response.data)
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível carregar os clientes.'), 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
    const handleDataChanged = (e) => {
      if (e.detail.resource === 'clients') loadClients()
    }
    window.addEventListener('eden:data-changed', handleDataChanged)
    return () => window.removeEventListener('eden:data-changed', handleDataChanged)
  }, [])

  const handleDeleteClient = (client) => {
    openConfirmation(
      'Deletar Cliente',
      `Tem certeza que deseja remover o cliente "${client.nome}"? Esta ação não pode ser desfeita.`,
      async () => {
        try {
          await clientsApi.remove(client.id)
          addToast('Cliente removido com sucesso!', 'success')
          loadClients()
        } catch (error) {
          addToast(getApiError(error, 'Não foi possível remover o cliente.'), 'error')
        }
      },
      () => {},
      { confirmText: 'Deletar', cancelText: 'Cancelar', isDangerous: true }
    )
  }

  const getUpcomingBirthdays = () => {
    const today = new Date()
    return clients.filter(client => {
      if (!client.data_aniversario) return false
      const [day, month] = client.data_aniversario.split('/').map(Number)
      const clientBirthday = new Date(today.getFullYear(), month - 1, day)
      if (clientBirthday < today) {
        clientBirthday.setFullYear(today.getFullYear() + 1)
      }
      const daysUntil = Math.floor((clientBirthday - today) / (1000 * 60 * 60 * 24))
      return daysUntil <= 30 && daysUntil >= 0
    }).sort((a, b) => {
      const [dayA, monthA] = a.data_aniversario.split('/').map(Number)
      const [dayB, monthB] = b.data_aniversario.split('/').map(Number)
      return monthA === monthB ? dayA - dayB : monthA - monthB
    })
  }

  const upcomingBirthdays = getUpcomingBirthdays()

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Clientes</h1>
          <p className="text-stone-600 mt-1">Gerencie clientes e aniversários</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Total de Clientes</h3>
              <i className="fa-solid fa-users text-blue-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">{clients.length}</p>
            <p className="text-xs text-stone-500 mt-2">Clientes cadastrados</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Aniversários Próximos</h3>
              <i className="fa-solid fa-cake-candles text-pink-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">{upcomingBirthdays.length}</p>
            <p className="text-xs text-stone-500 mt-2">Nos próximos 30 dias</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-600">Com Telefone</h3>
              <i className="fa-solid fa-phone text-green-500 text-2xl"></i>
            </div>
            <p className="text-3xl font-bold text-eden-primary">{clients.filter(c => c.telefone).length}</p>
            <p className="text-xs text-stone-500 mt-2">Contatos disponíveis</p>
          </div>
        </div>

        {/* Upcoming Birthdays */}
        {upcomingBirthdays.length > 0 && (
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-pink-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-cake-candles text-pink-500"></i>
              Aniversários Próximos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingBirthdays.map(client => (
                <div key={client.id} className="bg-white rounded-lg p-4 border border-pink-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">{client.nome}</p>
                      <p className="text-sm text-stone-600">{client.data_aniversario}</p>
                    </div>
                    <i className="fa-solid fa-cake-candles text-pink-500 text-xl"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-eden-primary">Lista de Clientes</h2>
            <button onClick={() => openModal('newClient')} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors text-sm font-medium">
              <i className="fa-solid fa-plus mr-2"></i>
              Novo Cliente
            </button>
          </div>

          {loading && <p className="p-6 text-stone-600">Carregando clientes...</p>}
          {!loading && clients.length === 0 && <p className="p-6 text-stone-600">Nenhum cliente cadastrado.</p>}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Telefone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Aniversário</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">{client.nome}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{client.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{client.telefone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {client.data_aniversario ? (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-cake-candles text-pink-500"></i>
                          {client.data_aniversario}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button onClick={() => openModal('editClient', client)} className="text-eden-primary hover:text-eden-light transition-colors" title="Editar">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button onClick={() => handleDeleteClient(client)} className="text-red-600 hover:text-red-700 transition-colors" title="Deletar">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

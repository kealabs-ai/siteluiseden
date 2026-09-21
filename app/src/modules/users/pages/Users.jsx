import React, { useEffect, useState } from 'react'
import { getApiError, notifyDataChanged, usersApi } from '../../../services/api'
import { useToast } from '../../../ToastContext'

const MENU_OPTIONS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'sales', label: 'Vendas' },
  { id: 'budget', label: 'Orçamentos' },
  { id: 'cashflow', label: 'Fluxo de Caixa' },
  { id: 'maintenance', label: 'Agenda de Cuidados' },
  { id: 'supplier', label: 'Fornecedores' },
  { id: 'users', label: 'Usuários e Acessos' }
]

const EMPTY_FORM = {
  id: '',
  nome: '',
  email: '',
  senha: '',
  role: 'operador',
  permissoes: ['dashboard', 'catalog', 'sales', 'cashflow']
}

export default function Users() {
  const { addToast } = useToast()
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      const { data } = await usersApi.list()
      setUsers(data)
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível carregar os usuários.'), 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(previous => ({ ...previous, [name]: value }))
  }

  const togglePermission = (permission) => {
    setForm(previous => ({
      ...previous,
      permissoes: previous.permissoes.includes(permission)
        ? previous.permissoes.filter(item => item !== permission)
        : [...previous.permissoes, permission]
    }))
  }

  const selectUser = (user) => {
    setForm({
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: '',
      role: user.role,
      permissoes: user.permissoes || []
    })
  }

  const resetForm = () => setForm(EMPTY_FORM)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.nome || !form.email || (!form.id && !form.senha)) {
      addToast('Preencha nome, e-mail e senha para novos usuários.', 'error')
      return
    }

    try {
      if (form.id) {
        await usersApi.update({ id: form.id, nome: form.nome, email: form.email, role: form.role, permissoes: form.permissoes })
        if (form.senha) await usersApi.updatePassword(form.id, form.senha)
        addToast('Usuário atualizado com sucesso.', 'success')
      } else {
        await usersApi.create({ nome: form.nome, email: form.email, senha: form.senha, role: form.role, permissoes: form.permissoes })
        addToast('Usuário cadastrado com sucesso.', 'success')
      }
      resetForm()
      notifyDataChanged('usuarios')
      loadUsers()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível salvar o usuário.'), 'error')
    }
  }

  const toggleActive = async (user) => {
    try {
      await usersApi.update({ id: user.id, ativo: !user.ativo })
      addToast(user.ativo ? 'Usuário desativado.' : 'Usuário ativado.', 'success')
      loadUsers()
    } catch (error) {
      addToast(getApiError(error, 'Não foi possível alterar o status.'), 'error')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eden-primary font-display">Usuários e Acessos</h1>
          <p className="text-stone-600 mt-1">Cadastre usuários e defina os módulos disponíveis para cada perfil.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-8">
          <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-eden-primary">Usuários cadastrados</h2>
                <p className="text-sm text-stone-500 mt-1">{users.length} registros</p>
              </div>
              <button onClick={resetForm} className="px-4 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light text-sm font-medium">
                <i className="fa-solid fa-plus mr-2"></i>Novo usuário
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Usuário</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Perfil</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Menus</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-stone-200 hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-stone-900">{user.nome}</p>
                        <p className="text-sm text-stone-500">{user.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-stone-700">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{user.role === 'admin' ? 'Todos' : `${(user.permissoes || []).length} permitidos`}</td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.ativo ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'}`}>{user.ativo ? 'Ativo' : 'Inativo'}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => selectUser(user)} className="text-eden-primary hover:text-eden-light mr-4" title="Editar usuário"><i className="fa-solid fa-edit"></i></button>
                        <button onClick={() => toggleActive(user)} className="text-stone-600 hover:text-stone-900" title={user.ativo ? 'Desativar usuário' : 'Ativar usuário'}><i className={`fa-solid ${user.ativo ? 'fa-user-slash' : 'fa-user-check'}`}></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && users.length === 0 && <p className="p-8 text-center text-stone-600">Nenhum usuário cadastrado.</p>}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-stone-200 p-6 h-fit">
            <h2 className="text-lg font-bold text-eden-primary mb-5">{form.id ? 'Editar usuário' : 'Cadastrar usuário'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg" />
              <input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder={form.id ? 'Nova senha (opcional)' : 'Senha'} className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg" />
              <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg">
                <option value="admin">Administrador</option>
                <option value="operador">Operador</option>
                <option value="cliente">Cliente</option>
              </select>
              <div>
                <p className="text-sm font-semibold text-stone-700 mb-3">Menus permitidos</p>
                <div className="grid grid-cols-2 gap-2">
                  {MENU_OPTIONS.map(menu => (
                    <label key={menu.id} className="flex items-center gap-2 text-sm text-stone-700">
                      <input type="checkbox" checked={form.role === 'admin' || form.permissoes.includes(menu.id)} disabled={form.role === 'admin'} onChange={() => togglePermission(menu.id)} />
                      {menu.label}
                    </label>
                  ))}
                </div>
                {form.role === 'admin' && <p className="text-xs text-stone-500 mt-2">Administradores acessam todos os menus.</p>}
              </div>
              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 px-4 py-3 bg-eden-primary text-white rounded-lg hover:bg-eden-light font-semibold">Salvar</button>
                {form.id && <button type="button" onClick={resetForm} className="px-4 py-3 bg-stone-200 text-stone-700 rounded-lg font-semibold">Cancelar</button>}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

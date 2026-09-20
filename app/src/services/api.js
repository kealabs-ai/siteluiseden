import axios from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://srv1023256.hstgr.cloud').replace(/\/$/, '')
const API_PREFIX = '/v1/eden'

export const api = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export const getApiError = (error, fallback = 'Não foi possível concluir a operação.') => {
  return error.response?.data?.detail || error.response?.data?.message || error.message || fallback
}

export const authApi = {
  login: (email, senha) => api.post('/auth/login', { email, senha }),
  me: () => api.get('/auth/me')
}

export const catalogApi = {
  list: () => api.get('/catalogo'),
  create: (data) => api.post('/catalogo', data),
  update: (data) => api.post('/catalogo/update', data),
  remove: (id) => api.post('/catalogo/delete', { id })
}

export const salesApi = {
  list: () => api.get('/vendas'),
  create: (data) => api.post('/vendas', data),
  cancel: (id, motivo) => api.post('/vendas/cancel', { id, motivo }),
  dashboard: () => api.get('/vendas/dashboard')
}

export const financeApi = {
  list: () => api.get('/financeiro'),
  create: (data) => api.post('/financeiro', data),
  update: (data) => api.post('/financeiro/update', data),
  remove: (id) => api.post('/financeiro/delete', { id }),
  dashboard: () => api.get('/financeiro/dashboard')
}

export const budgetApi = {
  list: () => api.get('/orcamentos'),
  create: (data) => api.post('/orcamentos', data),
  update: (data) => api.post('/orcamentos/update', data),
  remove: (id) => api.post('/orcamentos/delete', { id })
}

export const maintenanceApi = {
  list: () => api.get('/manutencao'),
  create: (data) => api.post('/manutencao', data),
  update: (data) => api.post('/manutencao/update', data),
  remove: (id) => api.post('/manutencao/delete', { id })
}

export const supplierApi = {
  list: () => api.get('/fornecedores'),
  create: (data) => api.post('/fornecedores', data),
  update: (data) => api.post('/fornecedores/update', data),
  remove: (id) => api.post('/fornecedores/delete', { id })
}

export const notifyDataChanged = (resource) => {
  window.dispatchEvent(new CustomEvent('eden:data-changed', { detail: { resource } }))
}

export default api

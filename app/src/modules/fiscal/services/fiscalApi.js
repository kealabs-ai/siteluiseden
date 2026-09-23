import axios from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://srv1023256.hstgr.cloud').replace(/\/$/, '')
const API_PREFIX = '/v1/eden/fiscal'

const api = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const fiscalApi = {
  // Configuração Fiscal
  createConfig: (data) => api.post('/configuracao', data),
  getConfig: (empresaId) => api.get(`/configuracao/${empresaId}`),

  // NF-e
  createNFe: (data) => api.post('/nfe', data),
  getNFe: (nfeId) => api.get(`/nfe/${nfeId}`),
  listNFe: () => api.get('/nfe'),

  // Assinatura e Autorização
  signNFe: (nfeId) => api.post('/nfe/assinar', { notaFiscalId: nfeId }),
  authorizeNFe: (nfeId) => api.post('/nfe/autorizar', { notaFiscalId: nfeId }),

  // Consultas
  consultaProtocolo: (chaveNfe) => api.post('/nfe/consulta-protocolo', { chaveNfe }),
  statusSefaz: () => api.get('/status-sefaz'),

  // Cancelamento
  cancelNFe: (nfeId, justificativa) => api.post('/nfe/cancelar', {
    notaFiscalId: nfeId,
    justificativa
  })
}

export default fiscalApi

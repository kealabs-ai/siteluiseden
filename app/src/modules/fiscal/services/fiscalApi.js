import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

const fiscalApi = {
  // Configuração Fiscal
  createConfig: (data) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/configuracao`, data),
  getConfig: (empresaId) => axios.get(`${API_BASE_URL}/v1/eden/fiscal/configuracao/${empresaId}`),

  // NF-e
  createNFe: (data) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/nfe`, data),
  getNFe: (nfeId) => axios.get(`${API_BASE_URL}/v1/eden/fiscal/nfe/${nfeId}`),
  listNFe: () => axios.get(`${API_BASE_URL}/v1/eden/fiscal/nfe`),

  // Assinatura e Autorização
  signNFe: (nfeId) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/nfe/assinar`, { notaFiscalId: nfeId }),
  authorizeNFe: (nfeId) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/nfe/autorizar`, { notaFiscalId: nfeId }),

  // Consultas
  consultaProtocolo: (chaveNfe) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/nfe/consulta-protocolo`, { chaveNfe }),
  statusSefaz: () => axios.get(`${API_BASE_URL}/v1/eden/fiscal/status-sefaz`),

  // Cancelamento
  cancelNFe: (nfeId, justificativa) => axios.post(`${API_BASE_URL}/v1/eden/fiscal/nfe/cancelar`, {
    notaFiscalId: nfeId,
    justificativa
  })
}

export default fiscalApi

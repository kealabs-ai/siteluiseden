import React, { useState, useEffect } from 'react'
import { useModal } from '../../../ModalContext'
import { useToast } from '../../../ToastContext'
import fiscalApi from '../services/fiscalApi'

export default function ConfigFiscalModal() {
  const { closeModal } = useModal()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    empresaId: '',
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    inscricaoEstadual: '',
    certificadoPath: '',
    certificadoSenha: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.empresaId || !formData.cnpj || !formData.razaoSocial || !formData.certificadoPath) {
      addToast('Preencha todos os campos obrigatórios', 'error')
      return
    }

    setLoading(true)
    try {
      await fiscalApi.createConfig(formData)
      addToast('Configuração fiscal criada com sucesso', 'success')
      window.dispatchEvent(new Event('eden:data-changed'))
      closeModal()
    } catch (error) {
      addToast(error.response?.data?.detail || 'Erro ao criar configuração', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-eden-primary mb-6">Configuração Fiscal</h2>

        <form onSubmit={handleSubmit}>
          {/* Empresa ID */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">ID da Empresa *</label>
            <input
              type="text"
              name="empresaId"
              value={formData.empresaId}
              onChange={handleChange}
              placeholder="UUID da empresa"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              required
            />
          </div>

          {/* CNPJ */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">CNPJ *</label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              required
            />
          </div>

          {/* Razão Social */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Razão Social *</label>
            <input
              type="text"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleChange}
              placeholder="Nome da empresa"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              required
            />
          </div>

          {/* Nome Fantasia */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Nome Fantasia</label>
            <input
              type="text"
              name="nomeFantasia"
              value={formData.nomeFantasia}
              onChange={handleChange}
              placeholder="Nome comercial"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
            />
          </div>

          {/* Inscrição Estadual */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Inscrição Estadual</label>
            <input
              type="text"
              name="inscricaoEstadual"
              value={formData.inscricaoEstadual}
              onChange={handleChange}
              placeholder="IE"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
            />
          </div>

          {/* Caminho do Certificado */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Caminho do Certificado *</label>
            <input
              type="text"
              name="certificadoPath"
              value={formData.certificadoPath}
              onChange={handleChange}
              placeholder="/etc/ssl/certs/empresa.pfx"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
              required
            />
            <p className="text-xs text-stone-500 mt-1">
              Caminho absoluto para o arquivo .pfx ou .pem do certificado digital
            </p>
          </div>

          {/* Senha do Certificado */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Senha do Certificado</label>
            <input
              type="password"
              name="certificadoSenha"
              value={formData.certificadoSenha}
              onChange={handleChange}
              placeholder="Senha do certificado"
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-eden-primary"
            />
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <i className="fa-solid fa-info-circle mr-2"></i>
              Certifique-se de que o certificado digital está armazenado em local seguro e acessível pelo servidor.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 border-2 border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-eden-primary text-white rounded-lg hover:bg-eden-light transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

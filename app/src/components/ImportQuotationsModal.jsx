import React, { useState } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, notifyDataChanged, quotationApi, supplierApi } from '../services/api'

export function ImportQuotationsModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState({})

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (!selectedFile.name.match(/\.(xls|xlsx|csv)$/i)) {
        addToast('Por favor, selecione um arquivo Excel ou CSV', 'error')
        return
      }
      setFile(selectedFile)
    }
  }

  const parseExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target.result
          const lines = data.split('\n')
          const rows = []

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim()
            if (!line) continue

            const cells = line.split('\t').map(cell => cell.trim())
            if (cells.length >= 4 && cells[0]) {
              rows.push({
                fornecedor: cells[0],
                produto: cells[1],
                quantidade: parseInt(cells[2]) || 0,
                precoCusto: parseFloat(cells[3].replace(',', '.')) || 0
              })
            }
          }

          resolve(rows)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
      reader.readAsText(file)
    })
  }

  const loadSuppliers = async () => {
    try {
      const { data } = await supplierApi.list()
      const map = {}
      data.forEach(s => {
        map[s.nome.toLowerCase()] = s.id
      })
      setSuppliers(map)
    } catch (error) {
      addToast(getApiError(error, 'Erro ao carregar fornecedores'), 'error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      addToast('Selecione um arquivo para importar', 'error')
      return
    }

    setLoading(true)

    try {
      // Carregar fornecedores
      await loadSuppliers()

      // Parsear arquivo
      const rows = await parseExcelFile(file)

      if (rows.length === 0) {
        addToast('Nenhuma cotação encontrada no arquivo', 'error')
        setLoading(false)
        return
      }

      // Importar cotações
      let successCount = 0
      let errorCount = 0
      const errors = []

      for (const row of rows) {
        try {
          const supplierId = suppliers[row.fornecedor.toLowerCase()]

          if (!supplierId) {
            errorCount++
            errors.push(`Fornecedor "${row.fornecedor}" não encontrado`)
            continue
          }

          if (!row.produto || row.quantidade <= 0 || row.precoCusto <= 0) {
            errorCount++
            errors.push(`Dados inválidos para "${row.produto}"`)
            continue
          }

          // Assumir preço de venda como 1.5x o preço de custo
          const precoVenda = row.precoCusto * 1.5

          await quotationApi.create({
            fornecedorId: supplierId,
            descricao: row.produto,
            quantidade: row.quantidade,
            precoCustoCents: Math.round(row.precoCusto * 100),
            precoVendaCents: Math.round(precoVenda * 100)
          })

          successCount++
        } catch (error) {
          errorCount++
          errors.push(`Erro ao importar "${row.produto}": ${error.message}`)
        }
      }

      // Notificar resultado
      if (successCount > 0) {
        addToast(`${successCount} cotação(ões) importada(s) com sucesso!`, 'success')
        notifyDataChanged('cotacoes')
      }

      if (errorCount > 0) {
        const errorMsg = errors.slice(0, 3).join('\n')
        addToast(`${errorCount} erro(s) na importação:\n${errorMsg}`, 'warning')
      }

      if (successCount > 0) {
        setFile(null)
        onClose()
      }
    } catch (error) {
      addToast(getApiError(error, 'Erro ao processar arquivo'), 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-file-excel"></i>
            Importar Cotações
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Input */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-3">
              Selecione o arquivo de cotações
            </label>
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-eden-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
                disabled={loading}
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-stone-400"></i>
                  <p className="text-sm font-medium text-stone-700">
                    {file ? file.name : 'Clique para selecionar ou arraste o arquivo'}
                  </p>
                  <p className="text-xs text-stone-500">
                    Formatos aceitos: XLS, XLSX, CSV
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <i className="fa-solid fa-info-circle mr-2"></i>
              O arquivo deve conter as colunas: Fornecedor, Produto, Quantidade, Preço Custo
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!file || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Importando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check"></i>
                  Importar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

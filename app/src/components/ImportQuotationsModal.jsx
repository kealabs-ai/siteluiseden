import React, { useState } from 'react'
import { useToast } from '../ToastContext'
import { getApiError, notifyDataChanged, quotationApi, supplierApi } from '../services/api'
import { DragDropFileInput } from './DragDropFileInput'
import { downloadSampleFile } from '../utils/sampleFiles'
import * as XLSX from 'xlsx'

export function ImportQuotationsModal({ isOpen, onClose }) {
  const { addToast } = useToast()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState({})
  const [errors, setErrors] = useState([])
  const [importResult, setImportResult] = useState(null)

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
        addToast('Por favor, selecione um arquivo Excel (XLSX, XLS) ou CSV', 'error')
        return
      }
      setFile(selectedFile)
      setErrors([])
      setImportResult(null)
    }
  }

  const parseExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const fileName = file.name.toLowerCase()
      
      reader.onload = (e) => {
        try {
          let rows = []
          
          if (fileName.endsWith('.csv')) {
            // Processar CSV
            const data = e.target.result
            const lines = data.split('\n')
            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim()
              if (!line) continue

              // Suportar tanto vírgula quanto ponto-e-vírgula como separador
              const cells = line.split(/[,;]/).map(cell => cell.trim())
              if (cells.length >= 4 && cells[0]) {
                rows.push({
                  fornecedor: cells[0],
                  produto: cells[1],
                  quantidade: parseInt(cells[2]) || 0,
                  precoCusto: parseFloat(cells[3].replace(',', '.')) || 0
                })
              }
            }
          } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
            // Processar XLSX/XLS com biblioteca xlsx
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            
            // Pegar primeira planilha
            const sheetName = workbook.SheetNames[0]
            if (!sheetName) {
              reject(new Error('Nenhuma planilha encontrada no arquivo'))
              return
            }
            
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            
            // Processar dados
            for (let i = 1; i < jsonData.length; i++) {
              const row = jsonData[i]
              if (!row || !row[0]) continue
              
              rows.push({
                fornecedor: String(row[0] || '').trim(),
                produto: String(row[1] || '').trim(),
                quantidade: parseInt(row[2]) || 0,
                precoCusto: parseFloat(String(row[3] || '0').replace(',', '.')) || 0
              })
            }
          }

          if (rows.length === 0) {
            reject(new Error('Nenhuma linha de dados encontrada no arquivo. Verifique o formato.'))
          } else {
            resolve(rows)
          }
        } catch (error) {
          reject(new Error(`Erro ao processar arquivo: ${error.message}`))
        }
      }

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
      
      if (fileName.endsWith('.csv')) {
        reader.readAsText(file)
      } else {
        reader.readAsBinaryString(file)
      }
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
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      addToast('Selecione um arquivo para importar', 'error')
      return
    }

    setLoading(true)
    setErrors([])
    setImportResult(null)

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
      const errorsList = []

      for (let idx = 0; idx < rows.length; idx++) {
        const row = rows[idx]
        try {
          const supplierId = suppliers[row.fornecedor.toLowerCase()]

          if (!supplierId) {
            errorCount++
            errorsList.push({
              linha: idx + 2,
              fornecedor: row.fornecedor,
              produto: row.produto,
              erro: 'Fornecedor não encontrado'
            })
            continue
          }

          if (!row.produto || row.quantidade <= 0 || row.precoCusto <= 0) {
            errorCount++
            errorsList.push({
              linha: idx + 2,
              fornecedor: row.fornecedor,
              produto: row.produto || '(vazio)',
              erro: 'Dados inválidos (produto, quantidade ou preço)'
            })
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
          errorsList.push({
            linha: idx + 2,
            fornecedor: row.fornecedor,
            produto: row.produto,
            erro: error.message || 'Erro desconhecido'
          })
        }
      }

      // Armazenar resultado
      setImportResult({
        successCount,
        errorCount,
        totalRows: rows.length
      })
      setErrors(errorsList)

      // Notificar resultado
      if (successCount > 0) {
        addToast(`${successCount} cotação(ões) importada(s) com sucesso!`, 'success')
        notifyDataChanged('cotacoes')
      }

      if (errorCount > 0) {
        addToast(`${errorCount} erro(s) encontrado(s) na importação`, 'warning')
      }
    } catch (error) {
      addToast(getApiError(error, 'Erro ao processar arquivo'), 'error')
      setImportResult({
        successCount: 0,
        errorCount: 1,
        totalRows: 0
      })
      setErrors([{
        linha: 0,
        erro: error.message || 'Erro ao processar arquivo'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setErrors([])
    setImportResult(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-file-excel"></i>
            Importar Cotações
          </h2>
          <button onClick={handleClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Input with Drag and Drop */}
          <DragDropFileInput
            file={file}
            onFileChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            label="Selecione o arquivo de cotações"
            placeholder="Arraste o arquivo aqui ou clique para selecionar"
            formats="XLSX, XLS, CSV"
            disabled={loading}
            inputId="quotation-file-input"
          />

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
              <i className="fa-solid fa-info-circle"></i>
              Formato do Arquivo
            </p>
            <div className="text-xs text-blue-700 space-y-1 ml-6">
              <p>✓ Formatos aceitos: <strong>XLSX, XLS, CSV</strong></p>
              <p>✓ Colunas obrigatórias (nesta ordem):</p>
              <ul className="list-disc ml-4 space-y-0.5">
                <li><strong>Fornecedor</strong> - Nome do fornecedor</li>
                <li><strong>Produto</strong> - Nome/descrição do produto</li>
                <li><strong>Quantidade</strong> - Número inteiro</li>
                <li><strong>Preço Custo</strong> - Valor em R$ (ex: 10,50 ou 10.50)</li>
              </ul>
              <p className="pt-1">✓ CSV: use vírgula ou ponto-e-vírgula como separador</p>
              <p>✓ XLSX/XLS: primeira linha deve ser o cabeçalho</p>
            </div>
            
            {/* Download Sample Files */}
            <div className="pt-2 border-t border-blue-200 mt-3">
              <p className="text-xs text-blue-800 font-semibold mb-2">Baixar arquivo de exemplo:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => downloadSampleFile('csv')}
                  className="px-3 py-1.5 bg-blue-200 text-blue-800 rounded text-xs font-medium hover:bg-blue-300 transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-download"></i>
                  CSV (vírgula)
                </button>
                <button
                  type="button"
                  onClick={() => downloadSampleFile('csv-semicolon')}
                  className="px-3 py-1.5 bg-blue-200 text-blue-800 rounded text-xs font-medium hover:bg-blue-300 transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-download"></i>
                  CSV (ponto-e-vírgula)
                </button>
                <button
                  type="button"
                  onClick={() => downloadSampleFile('tsv')}
                  className="px-3 py-1.5 bg-blue-200 text-blue-800 rounded text-xs font-medium hover:bg-blue-300 transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-download"></i>
                  XLS/XLSX (tab)
                </button>
              </div>
            </div>
          </div>

          {/* Import Result */}
          {importResult && (
            <div className={`p-4 rounded-lg border-2 ${importResult.errorCount === 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className="flex items-start gap-3">
                <i className={`fa-solid ${importResult.errorCount === 0 ? 'fa-check-circle text-green-600' : 'fa-exclamation-triangle text-yellow-600'} text-xl mt-1`}></i>
                <div className="flex-1">
                  <p className={`font-semibold ${importResult.errorCount === 0 ? 'text-green-800' : 'text-yellow-800'}`}>
                    Resultado da Importação
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-stone-700">
                      <span className="font-semibold">Total de linhas:</span> {importResult.totalRows}
                    </p>
                    <p className="text-green-700">
                      <i className="fa-solid fa-check mr-1"></i>
                      <span className="font-semibold">Importadas:</span> {importResult.successCount}
                    </p>
                    {importResult.errorCount > 0 && (
                      <p className="text-red-700">
                        <i className="fa-solid fa-times mr-1"></i>
                        <span className="font-semibold">Erros:</span> {importResult.errorCount}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Errors List */}
          {errors.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-red-100 border-b border-red-200">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  Erros Encontrados ({errors.length})
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-red-100 border-b border-red-200 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-red-800">Linha</th>
                      <th className="px-4 py-2 text-left font-semibold text-red-800">Fornecedor</th>
                      <th className="px-4 py-2 text-left font-semibold text-red-800">Produto</th>
                      <th className="px-4 py-2 text-left font-semibold text-red-800">Erro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((error, idx) => (
                      <tr key={idx} className="border-b border-red-100 hover:bg-red-100/50">
                        <td className="px-4 py-2 text-red-700 font-semibold">{error.linha}</td>
                        <td className="px-4 py-2 text-stone-700">{error.fornecedor || '-'}</td>
                        <td className="px-4 py-2 text-stone-700">{error.produto || '-'}</td>
                        <td className="px-4 py-2 text-red-700 font-medium">{error.erro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold disabled:opacity-50"
            >
              Fechar
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

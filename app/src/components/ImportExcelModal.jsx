import React, { useState } from 'react'
import { useToast } from '../ToastContext'

export function ImportExcelModal({ isOpen, onClose }) {
  const { showToast } = useToast()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile)
      } else {
        showToast('Por favor, selecione um arquivo Excel (.xlsx, .xls) ou CSV', 'error')
      }
    }
  }

  const handleImport = async () => {
    if (!file) {
      showToast('Selecione um arquivo para importar', 'error')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      showToast(`Arquivo "${file.name}" importado com sucesso! 150 plantas adicionadas ao catálogo.`, 'success')
      setFile(null)
      setLoading(false)
      onClose()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-eden-primary to-eden-light text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-file-excel"></i>
            Importar Planilha Excel
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fa-solid fa-info-circle"></i>
              Instruções de Importação
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
              <li>A planilha deve conter as colunas: Nome, Fornecedor, Preço Custo, Preço Venda, Quantidade</li>
              <li>Formatos aceitos: .xlsx, .xls ou .csv</li>
              <li>A primeira linha deve conter os cabeçalhos</li>
              <li>Preços devem estar em formato numérico (ex: 25.50)</li>
            </ul>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-3">
              Selecione o arquivo
            </label>
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-eden-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <i className="fa-solid fa-cloud-arrow-up text-4xl text-stone-400"></i>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {file ? file.name : 'Clique para selecionar ou arraste um arquivo'}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Formatos: .xlsx, .xls, .csv
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* File Info */}
          {file && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-600"></i>
                <span>
                  <strong>Arquivo selecionado:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </p>
            </div>
          )}

          {/* Preview Info */}
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <h3 className="font-semibold text-stone-900 mb-2">Exemplo de Formato</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-stone-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Nome</th>
                    <th className="px-3 py-2 text-left">Fornecedor</th>
                    <th className="px-3 py-2 text-right">Preço Custo</th>
                    <th className="px-3 py-2 text-right">Preço Venda</th>
                    <th className="px-3 py-2 text-right">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="px-3 py-2">Rosa Vermelha</td>
                    <td className="px-3 py-2">Flores Brasil</td>
                    <td className="px-3 py-2 text-right">25.00</td>
                    <td className="px-3 py-2 text-right">45.00</td>
                    <td className="px-3 py-2 text-right">100</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Orquídea Branca</td>
                    <td className="px-3 py-2">Plantas Premium</td>
                    <td className="px-3 py-2 text-right">40.00</td>
                    <td className="px-3 py-2 text-right">65.00</td>
                    <td className="px-3 py-2 text-right">50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={!file || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-eden-primary to-eden-light text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Importando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check"></i>
                  Importar Arquivo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

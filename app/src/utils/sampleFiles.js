// Função para gerar arquivo de exemplo para importação de cotações

export const generateSampleQuotationFile = (format = 'csv') => {
  const sampleData = [
    ['Fornecedor', 'Produto', 'Quantidade', 'Preço Custo'],
    ['Flores Brasil', 'Rosa Vermelha Premium', '100', '5,50'],
    ['Flores Brasil', 'Orquídea Branca', '50', '12,00'],
    ['Plantas Verdes', 'Samambaia', '200', '3,25'],
    ['Plantas Verdes', 'Espada de São Jorge', '150', '4,75'],
    ['Insumos Ltda', 'Terra Adubada 20kg', '30', '25,00'],
    ['Insumos Ltda', 'Adubo Orgânico 5kg', '50', '15,50']
  ]

  let content = ''
  let filename = ''
  let mimeType = ''

  if (format === 'csv') {
    // CSV com vírgula como separador
    content = sampleData.map(row => row.join(',')).join('\n')
    filename = 'exemplo_cotacoes.csv'
    mimeType = 'text/csv'
  } else if (format === 'csv-semicolon') {
    // CSV com ponto-e-vírgula como separador
    content = sampleData.map(row => row.join(';')).join('\n')
    filename = 'exemplo_cotacoes_pt.csv'
    mimeType = 'text/csv'
  } else if (format === 'tsv') {
    // TSV (tab-separated) para XLS/XLSX
    content = sampleData.map(row => row.join('\t')).join('\n')
    filename = 'exemplo_cotacoes.txt'
    mimeType = 'text/plain'
  }

  // Criar blob e download
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const downloadSampleFile = (format = 'csv') => {
  generateSampleQuotationFile(format)
}

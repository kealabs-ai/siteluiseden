// Função para gerar template XLSX de cotações
export const generateQuotationTemplate = (supplierName = 'Fornecedor') => {
  // Criar dados do template
  const data = [
    ['TEMPLATE DE COTAÇÃO - LUIS EDEN PAISAGISMO'],
    [''],
    ['Fornecedor:', supplierName],
    ['Data:', new Date().toLocaleDateString('pt-BR')],
    [''],
    ['INSTRUÇÕES:'],
    ['1. Preencha os dados abaixo com as cotações de produtos'],
    ['2. Não altere os nomes das colunas'],
    ['3. Preços devem estar em reais (ex: 25.50)'],
    ['4. Quantidade deve ser um número inteiro'],
    ['5. Salve o arquivo e envie para Luis Eden'],
    [''],
    ['DADOS DAS COTAÇÕES:'],
    ['Descrição do Produto', 'Quantidade', 'Preço Custo (R$)', 'Preço Venda (R$)'],
    ['Rosa Vermelha', '100', '25.00', '45.00'],
    ['Orquídea Branca', '50', '40.00', '65.00'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]

  // Converter para CSV (compatível com Excel)
  const csv = data.map(row => 
    row.map(cell => {
      // Escapar aspas e envolver em aspas se contiver vírgula
      const cellStr = String(cell)
      return cellStr.includes(',') ? `"${cellStr.replace(/"/g, '""')}"` : cellStr
    }).join(',')
  ).join('\n')

  // Criar blob e download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `template_cotacoes_${supplierName.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

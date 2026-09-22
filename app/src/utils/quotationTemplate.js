// Função para gerar template XLSX com formatação profissional
export const generateQuotationTemplateAdvanced = (supplierName = 'Fornecedor') => {
  // Dados do template
  const headerData = [
    ['LUIS EDEN PAISAGISMO'],
    ['TEMPLATE DE COTAÇÃO DE PREÇOS'],
    [''],
    ['Fornecedor:', supplierName],
    ['Data:', new Date().toLocaleDateString('pt-BR')],
    [''],
    ['INSTRUÇÕES DE PREENCHIMENTO:'],
    ['• Preencha os dados abaixo com as cotações de produtos'],
    ['• Não altere os nome das colunas (linha 14)'],
    ['• Preços devem estar em reais (ex: 25.50)'],
    ['• Quantidade deve ser um número inteiro'],
    ['• Salve o arquivo e envie para Luis Eden'],
    [''],
  ]

  const tableHeader = ['Descrição do Produto', 'Quantidade', 'Preço Custo (R$)', 'Preço Venda (R$)']
  
  const exampleData = [
    ['Rosa Vermelha', 100, 25.00, 45.00],
    ['Orquídea Branca', 50, 40.00, 65.00],
    ['Girassol', 200, 18.00, 35.00],
  ]

  const emptyRows = Array(10).fill(['', '', '', ''])

  // Combinar todos os dados
  const allData = [
    ...headerData,
    tableHeader,
    ...exampleData,
    ...emptyRows
  ]

  // Converter para CSV com formatação
  const csv = allData.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const cellStr = String(cell)
      // Escapar aspas e envolver em aspas se contiver vírgula
      return cellStr.includes(',') ? `"${cellStr.replace(/"/g, '""')}"` : cellStr
    }).join(',')
  }).join('\n')

  // Adicionar BOM para UTF-8 (garante que acentos apareçam corretamente)
  const bom = '\uFEFF'
  const csvWithBom = bom + csv

  // Criar blob e download
  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `template_cotacoes_${supplierName.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Limpar URL
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

// Função para gerar template em HTML que pode ser aberto no Excel
export const generateQuotationTemplateHTML = (supplierName = 'Fornecedor') => {
  const html = `
    <html xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #2d5016; color: white; font-weight: bold; }
        .header { background-color: #4a7c2c; color: white; font-weight: bold; font-size: 14px; }
        .subheader { background-color: #d4af37; color: #2d5016; font-weight: bold; }
        .info { background-color: #f5f5f5; }
        .instructions { background-color: #f9f9f9; font-size: 11px; }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td colspan="4" class="header">LUIS EDEN PAISAGISMO</td>
        </tr>
        <tr>
          <td colspan="4" class="header">TEMPLATE DE COTAÇÃO DE PREÇOS</td>
        </tr>
        <tr>
          <td colspan="4"></td>
        </tr>
        <tr class="info">
          <td><strong>Fornecedor:</strong></td>
          <td colspan="3">${supplierName}</td>
        </tr>
        <tr class="info">
          <td><strong>Data:</strong></td>
          <td colspan="3">${new Date().toLocaleDateString('pt-BR')}</td>
        </tr>
        <tr>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td colspan="4"><strong>INSTRUÇÕES DE PREENCHIMENTO:</strong></td>
        </tr>
        <tr class="instructions">
          <td colspan="4">
            • Preencha os dados abaixo com as cotações de produtos<br>
            • Não altere os nomes das colunas<br>
            • Preços devem estar em reais (ex: 25.50)<br>
            • Quantidade deve ser um número inteiro<br>
            • Salve o arquivo e envie para Luis Eden
          </td>
        </tr>
        <tr>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td colspan="4"><strong>DADOS DAS COTAÇÕES:</strong></td>
        </tr>
        <tr>
          <th>Descrição do Produto</th>
          <th>Quantidade</th>
          <th>Preço Custo (R$)</th>
          <th>Preço Venda (R$)</th>
        </tr>
        <tr>
          <td>Rosa Vermelha</td>
          <td>100</td>
          <td>25.00</td>
          <td>45.00</td>
        </tr>
        <tr>
          <td>Orquídea Branca</td>
          <td>50</td>
          <td>40.00</td>
          <td>65.00</td>
        </tr>
        <tr>
          <td>Girassol</td>
          <td>200</td>
          <td>18.00</td>
          <td>35.00</td>
        </tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
      </table>
    </body>
    </html>
  `

  // Criar blob e download
  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `template_cotacoes_${supplierName.replace(/\s+/g, '_')}_${new Date().getTime()}.xls`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Limpar URL
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

// Exportar a função HTML como padrão (melhor compatibilidade com Excel)
export const generateQuotationTemplate = generateQuotationTemplateHTML

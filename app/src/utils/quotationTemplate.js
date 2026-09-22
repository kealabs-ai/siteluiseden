// Função para gerar template XLSX apenas com Cotacao
export const generateQuotationTemplate = (supplierName = 'Fornecedor') => {
  const html = `
    <html xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #2d5016; color: white; font-weight: bold; }
      </style>
    </head>
    <body>
      <x:ExcelWorkbook>
        <x:ExcelWorksheet x:Name="Cotacao">
          <table>
            <tr>
              <th>Fornecedor</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Custo</th>
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
        </x:ExcelWorksheet>
      </x:ExcelWorkbook>
    </body>
    </html>
  `

  // Criar blob e download
  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `template_cotacoes_${new Date().getTime()}.xls`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Limpar URL
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

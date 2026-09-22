// Máscaras para inputs
export const masks = {
  // Telefone: (11) 98765-4321
  phone: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
  },

  // CPF: 123.456.789-00
  cpf: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`
  },

  // CNPJ: 12.345.678/0001-90
  cnpj: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`
    if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`
  },

  // CPF ou CNPJ (detecta automaticamente)
  cpfOrCnpj: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) return masks.cpf(value)
    return masks.cnpj(value)
  },

  // Moeda: 1.234,56
  currency: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    const formatted = (parseInt(cleaned) / 100).toFixed(2)
    return formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  // Moeda com R$: R$ 1.234,56
  currencyBRL: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    const formatted = (parseInt(cleaned) / 100).toFixed(2)
    return `R$ ${formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  },

  // CEP: 12345-678
  cep: (value) => {
    if (!value) return ''
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 5) return cleaned
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`
  },

  // Quantidade (apenas números)
  quantity: (value) => {
    if (!value) return ''
    return value.replace(/\D/g, '')
  }
}

// Função para remover máscara e retornar apenas números
export const unmask = (value) => {
  if (!value) return ''
  return value.replace(/\D/g, '')
}

// Função para converter moeda formatada para centavos
export const currencyTocents = (value) => {
  if (!value) return 0
  const cleaned = value.replace(/\D/g, '')
  return parseInt(cleaned) || 0
}

// Função para converter centavos para moeda formatada
export const centsToCurrency = (cents) => {
  if (!cents) return '0,00'
  const value = (cents / 100).toFixed(2)
  return value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

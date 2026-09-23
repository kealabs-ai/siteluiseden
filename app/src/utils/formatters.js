export const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatCents = (cents) => {
  return formatCurrency(cents / 100)
}

export const formatPercentage = (value) => {
  if (typeof value !== 'number') return '0%'
  return `${value.toFixed(1)}%`
}

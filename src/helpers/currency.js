export const formatMoney = input => {
  let value = parseFloat(input)

  if (isNaN(value)) {
    value = 0.0
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

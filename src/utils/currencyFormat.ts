export const currencyFormat = (num: number) =>
  num && num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

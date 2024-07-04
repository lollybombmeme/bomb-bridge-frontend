import { toast } from 'react-toastify'

export const addressWalletCompact = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
}

export function fixedBalanceEtherZero(valueStr: string) {
  const stringArr = valueStr.toString().split('.')
  if (stringArr[1] === '0') {
    return stringArr[0]
  }
  return valueStr
}

export function numberWithCommas(num: any) {
  if (num) {
    num = num.toLocaleString('en-IN', { maximumSignificantDigits: 10 })
    const x = num.toString().split('.')
    x[0] = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return x.join('.')
  }
}

export function truncate(str: string, maxDecimalDigits: number) {
  if (!/^\d+\.?\d*$/.test(str)) {
    return str
  }

  if (str.includes('.')) {
    const parts = str.split('.')
    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits)
  }

  return str
}

export function nFormatter(num: number, digits = 2) {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.\d*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  return (
    (num / si[i].value)
      .toString()
      .split('.')
      .map((item, index) => (index > 0 ? item.slice(0, digits) : item))
      .join('.')
      .replace(rx, '$1') + si[i].symbol
  )
}

export const formatWalletAddress = (address: Metamask.Address) => {
  if (!address) return 'Connect Wallet'
  return `${address.slice(0, 7)}...${address.slice(address.length - 5, address.length)}`
}
export function ConvertTimestamp(createdTime: number) {
  const date = new Date(createdTime * 1000) // Convert to milliseconds
  // Extracting date components
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const year = date.getFullYear()

  // Extracting time components
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12'
  const formattedTime = `${hours}:${minutes} ${ampm}`

  // Combining date and time
  const formattedDateTime = `${day}.${month}.${year} ${formattedTime}`
  return formattedDateTime
}

export const notifySuccess = (message: string) => {
  toast.success(message)
}
export const notifyWarning = (message: string) => {
  toast.warning(message)
}
export const notifyErrors = (message: string) => {
  toast.error(message)
}

export function capitalizeFirstLetter(text: string) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

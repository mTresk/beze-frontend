export function formatPhone(phone?: string): string {
  if (!phone) {
    return ''
  }

  if (phone[0] === '+') {
    return `+${phone.slice(1).replace(/\D/g, '')}`
  }

  return phone.replace(/\D/g, '')
}

export function trimTrailingSlash(path: string): string {
  if (path.length > 1 && path.slice(-1) === '/') {
    return path.slice(0, -1)
  }

  return path
}

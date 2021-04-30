export const showTime = (): string => {
  const time = new Date()
  const z = (v: number): string => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  return (
    time.getFullYear() +
    '/' +
    (time.getMonth() + 1) +
    '/' +
    time.getDate() +
    ' ' +
    z(time.getHours()) +
    ':' +
    z(time.getMinutes()) +
    ':' +
    z(time.getSeconds())
  )
}

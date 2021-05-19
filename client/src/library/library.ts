export const showTime = (datetime: string) => {
  const date = datetime.split('T')[0]
  const time = datetime.split('T')[1]
  return date.split('-')[1] + '月' + date.split('-')[2] + '日 ' + time.split(':')[0] + ':' + time.split(':')[1]
}

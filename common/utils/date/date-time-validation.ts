export const validateFutureDate = (value: string) => {
  const selected = new Date(value)
  const now = new Date()
  return selected.getTime() > now.getTime()
}

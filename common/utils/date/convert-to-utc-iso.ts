/**
 * Convierte una fecha local (del input datetime-local)
 * a formato ISO UTC, ej: "2025-11-12T12:00:00.000Z"
 *
 * @param localDateStr Fecha en formato local (ej: "2025-11-12T07:00")
 * @returns string ISO UTC
 */
export const convertLocalToUtcIso = (localDateStr: string): string => {
  if (!localDateStr) throw new Error('No se proporcionó una fecha válida.')

  const localDate = new Date(localDateStr)
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  )
  return utcDate.toISOString().slice(0, 16)
}

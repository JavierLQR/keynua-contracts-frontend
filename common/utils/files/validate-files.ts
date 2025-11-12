export const isValidFileType = (file: File) => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]
  return validTypes.includes(file.type)
}

export const isValidFileSize = (file: File, maxMB = 4.5) =>
  file.size <= maxMB * 1024 * 1024

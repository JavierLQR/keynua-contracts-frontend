import { toast } from 'sonner'

import { convertFilesToBase64, UploadedFile } from './converted-files'
import { isValidFileSize, isValidFileType } from './validate-files'

/**
 * Maneja y valida carga de archivos antes de enviarlos al backend.
 * Retorna solo los archivos válidos convertidos a base64.
 */
export const handleFileUpload = async (
  fileList: FileList | null,
  options?: { maxMB?: number }
): Promise<UploadedFile[]> => {
  if (!fileList || fileList.length === 0) return []

  const validFiles: File[] = []

  for (const file of Array.from(fileList)) {
    if (!isValidFileType(file)) {
      toast.error(`El archivo ${file.name} no tiene un formato permitido.`)
      continue
    }

    if (!isValidFileSize(file, options?.maxMB ?? 4.5)) {
      toast.error(
        `El archivo ${file.name} excede los ${options?.maxMB ?? 4.5} MB.`
      )
      continue
    }

    validFiles.push(file)
  }

  const base64Files = await convertFilesToBase64(validFiles)

  return base64Files
}

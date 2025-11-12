import { toBase64 } from '../base64/to-base64'

export type UploadedFile = {
  name: string
  base64: string
  size: number
}

export const convertFilesToBase64 = async (
  files: Iterable<File> | ArrayLike<File>
): Promise<UploadedFile[]> => {
  const result: UploadedFile[] = []

  for (const file of Array.from(files)) {
    const base64 = await toBase64(file)
    result.push({
      name: file.name,
      base64,
      size: file.size,
    })
  }

  return result
}

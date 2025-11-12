import { UploadedFile } from '@/common/utils/files/converted-files'
import { useState } from 'react'
import { SignatureProcess } from '../types/contract-form-type'

/**
 *
 * @returns  Contract form state manager
 * @description State manager for the contract form
 *
 */
export const useContractState = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const [signatureProcess, setSignatureProcess] =
    useState<SignatureProcess>('contracts-peru')

  return {
    uploadedFiles,
    setUploadedFiles,
    signatureProcess,
    setSignatureProcess,
  }
}

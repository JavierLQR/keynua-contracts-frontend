import { UseFormReturn } from 'react-hook-form'
import { DocumentFormValues } from '../schema/contract-schema'
import { UploadedFile } from '@/common/utils/files/converted-files'

/**
 * Props for the SectionUploadFiles component
 * @see SectionUploadFiles
 * @see DocumentForm
 */
export interface SectionUploadFilesProps {
  form: UseFormReturn<DocumentFormValues>
  uploadedFiles: UploadedFile[]
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

/**
 * Props for the SectionDocumentData component
 * @see SectionDocumentData
 * @see DocumentForm
 */
export interface SectionDocumentDataProps {
  form: UseFormReturn<DocumentFormValues>
  expirationTime: string | undefined
}

/**
 * Type for the notification selector component
 * @see NotificationSelector
 * @see DocumentForm
 */
export type NotificationType =
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'email+sms'
  | 'email+whatsapp'

/**
 * Props for the NotificationSelector component
 * @see NotificationSelector
 * @see DocumentForm
 */
export interface NotificationSelectorProps {
  value: NotificationType
  onChange: (value: NotificationType) => void
  label?: string
}

/**
 * Type for the alert frequency selector component
 * @see AlertFrequencySelector
 * @see DocumentForm
 */
export type AlertFrequency = 120 | 300 | 600 | 1440 | 4320

/**
 * Props for the AlertFrequencySelector component
 * @see AlertFrequencySelector
 * @see DocumentForm
 */
export interface AlertFrequencySelectorProps {
  value: number
  onChange: (value: number) => void
}

/**
 * Type for the signature process selector component
 * @see SignatureProcessSelector
 * @see DocumentForm
 * @see SignatureProcess
 */
export type SignatureProcess = 'contracts-peru'

/**
 * Props for the SignatureProcessSelector component
 * @see SignatureProcessSelector
 * @see DocumentForm
 */
export interface SignatureProcessOption {
  id: SignatureProcess
  title: string
  description: string
  icon: React.ReactNode
}

/**
 * Props for the SignatureProcessSelector component
 * @see SignatureProcessSelector
 * @see DocumentForm
 */
export interface SignatureProcessSelectorProps {
  value: SignatureProcess
  onChange: (value: SignatureProcess) => void
}

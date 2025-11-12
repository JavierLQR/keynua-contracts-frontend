import { FileText } from 'lucide-react'
import {
  AlertFrequency,
  NotificationType,
  SignatureProcessOption,
} from '../types/contract-form-type'

const expirationOptions = [
  { value: '24h', label: '24 Horas' },
  { value: '48h', label: '48 Horas' },
  { value: '72h', label: '72 Horas' },
  { value: '96', label: '4 Días' },
  { value: '120', label: '5 Días' },
  { value: '360', label: '15 Días' },
  { value: '720', label: '30 Días' },
  { value: 'custom', label: 'Personalizar por fecha y hora' },
]

const NOTIFICATION_OPTIONS: { value: NotificationType; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'Whatsapp' },
  { value: 'email+sms', label: 'Email + SMS' },
  { value: 'email+whatsapp', label: 'Email + Whatsapp' },
]

const FREQUENCY_OPTIONS: { value: AlertFrequency; label: string }[] = [
  { label: 'Cada 2 horas', value: 120 },
  { label: 'Cada 5 horas', value: 300 },
  { label: 'Cada 10 horas', value: 600 },
  { label: 'Cada 24 horas', value: 1440 },
  { label: 'Cada 72 horas', value: 4320 },
]

const PROCESS_OPTIONS: SignatureProcessOption[] = [
  {
    id: 'contracts-peru',
    title: 'Contratos con Firmas Peru',
    description:
      'Este proceso permite subir y enviar contratos para firma con verificación de identidad de los firmantes contra RENIEC.',
    icon: <FileText className="h-5 w-5" />,
  },
]

export {
  expirationOptions,
  NOTIFICATION_OPTIONS,
  FREQUENCY_OPTIONS,
  PROCESS_OPTIONS,
}

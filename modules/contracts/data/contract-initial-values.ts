import { DocumentFormValues } from '../schema/contract-schema'

export const contractInitialValues: DocumentFormValues = {
  title: '',
  reference: '',
  description: '',
  expirationInHours: '72h',
  documents: [],
  pdfData: {
    addSignatureOnAllDocs: false,
  },
  templateId: 'keynua-peru-default',

  flags: {
    remindersData: {
      enabled: false,
      frequency: 120,
      maxAttempts: 1,
    },
  },
  expirationDatetime: '',
  chosenNotificationOptions: ['email'],

  users: [
    {
      name: '',
      email: '',
      phone: '',
      groups: ['signers'],
    },
  ],
}

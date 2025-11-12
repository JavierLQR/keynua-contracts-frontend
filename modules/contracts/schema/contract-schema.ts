import { z } from 'zod'
import { validateFutureDate } from '../../../common/utils/date/date-time-validation'

export const documentFormSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),

  reference: z
    .string()
    .min(1, 'La referencia es requerida')
    .max(50, 'La referencia no puede exceder 50 caracteres'),

  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(500, 'La descripción no puede exceder 500 caracteres'),

  expirationInHours: z
    .string()
    .min(1, 'Selecciona un tiempo de expiración')
    .optional(),

  expirationDatetime: z
    .string()
    .optional()
    .refine((val) => !val || validateFutureDate(val), {
      message: 'La fecha debe ser posterior al momento actual',
    }),

  documents: z
    .array(
      z.object({
        name: z.string().min(1, 'El nombre del archivo es requerido'),
        base64: z
          .string()
          .min(1, 'El contenido base64 es requerido')
          .refine(
            (val) => val.startsWith('data:'),
            'El formato base64 debe incluir el prefijo data:'
          ),
      })
    )
    .min(1, 'Debes subir al menos un archivo')
    .max(5, 'Solo se permiten hasta 5 archivos'),

  pdfData: z.object({
    addSignatureOnAllDocs: z.boolean(),
  }),

  templateId: z.string(),

  flags: z.object({
    remindersData: z.object({
      enabled: z.boolean(),
      frequency: z.number().min(1, 'Frecuencia requerida'),
      maxAttempts: z.number().min(1, 'Cantidad requerida').max(20),
    }),
  }),
  chosenNotificationOptions: z
    .array(z.string())
    .min(1, 'Selecciona al menos un canal de notificación'),

  users: z.array(
    z.object({
      name: z.string().min(1, 'El nombre es requerido'),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      groups: z.array(z.string()),
    })
  ),
})

export const refinedDocumentSchema = documentFormSchema.superRefine(
  (data, ctx) => {
    const user = data.users[0]

    if (!user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debes agregar al menos un usuario firmante',
      })
      return
    }

    const type = data.chosenNotificationOptions[0]

    const needsEmail = ['email', 'email+sms', 'email+whatsapp'].includes(type)

    const needsPhone = [
      'sms',
      'whatsapp',
      'email+sms',
      'email+whatsapp',
    ].includes(type)

    if (needsEmail && !user.email) {
      ctx.addIssue({
        path: ['users', 0, 'email'],
        code: z.ZodIssueCode.custom,
        message: 'El email es obligatorio para esta opción',
      })
    }

    if (needsPhone && !user.phone) {
      ctx.addIssue({
        path: ['users', 0, 'phone'],
        code: z.ZodIssueCode.custom,
        message: 'El número es obligatorio para esta opción',
      })
    }
  }
)

export type DocumentFormValues = z.infer<typeof documentFormSchema>

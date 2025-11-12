/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentFormValues } from '../schema/contract-schema'
import { convertLocalToUtcIso } from '@/common/utils/date/convert-to-utc-iso'
import { cleanTypeNotification } from '@/common/utils/notifications/clean-type-notification'

/**
 * Limpia y transforma los datos del formulario antes de enviar al backend.
 * @see prepareContractPayload
 * @see DocumentForm
 * @see DocumentFormValues
 */
export const prepareContractPayload = (
  data: DocumentFormValues
): DocumentFormValues => {
  let payload: DocumentFormValues = { ...data }

  if (data.expirationInHours === 'custom' && data.expirationDatetime) {
    const { expirationDatetime, ...rest } = data
    payload = {
      ...rest,
      expirationDatetime: convertLocalToUtcIso(data.expirationDatetime),
    }
  }

  const hours = payload.expirationInHours?.split('h')[0]
  const { expirationDatetime, ...cleanData } = data

  const notifications = cleanTypeNotification(
    cleanData.chosenNotificationOptions[0]
  )

  cleanData.chosenNotificationOptions = notifications
  if (hours) cleanData.expirationInHours = hours

  return cleanData
}

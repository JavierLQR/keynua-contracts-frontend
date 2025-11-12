import { useMutation } from '@tanstack/react-query'
import { createContract } from './contract-api.service'
import { DocumentFormValues } from '../schema/contract-schema'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useMutationCreateContract = () => {
  return useMutation({
    mutationKey: ['createContract'],
    mutationFn: async (data: DocumentFormValues) => await createContract(data),
    onSuccess: (response) => {
      toast.success(response.message, {
        duration: 5000,
        position: 'top-center',
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as {
        message: string
      }

      console.error(error)

      toast.error(message || 'Error al crear el contrato', {
        description: error.message,
        duration: 5000,
      })
    },
  })
}

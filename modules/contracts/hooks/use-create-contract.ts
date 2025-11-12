'use client'

import { useMutation } from '@tanstack/react-query'

import {
  ApiError,
  ContractResponse,
  CreateContractPayload,
} from '../types/contract-type'
import { createContractAction } from '@/app/actions/contract/create-contract'

export function useCreateContract() {
  return useMutation<ContractResponse, ApiError, CreateContractPayload>({
    mutationFn: async (payload) => {
      try {
        return await createContractAction(payload)
      } catch (error) {
        throw {
          message:
            error instanceof Error
              ? error.message
              : 'Error al crear el contrato',
          status: 'error',
        } as ApiError
      }
    },
  })
}

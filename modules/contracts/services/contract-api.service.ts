import { methodsAxios } from '@/common/utils/adapters/adaptar-axios'
import { DocumentFormValues } from '../schema/contract-schema'
import { CONTRACTS } from '@/common/path-service/path-service'
import { ApiResponse } from '@/common/utils/api-response'
import { Contract } from '../types/contract-response-type'

export const createContract = async (data: DocumentFormValues) =>
  await methodsAxios.POST<ApiResponse<Contract>, DocumentFormValues>(
    `${CONTRACTS}/create`,
    data
  )

export const getOneContract = async (id: string) =>
  await methodsAxios.GET<ApiResponse<Contract>>(`${CONTRACTS}/${id}`)

import { useQuery } from '@tanstack/react-query'
import { getOneContract } from './contract-api.service'

export const useQueryGetOneContract = (id: string) => {
  return useQuery({
    queryKey: ['contract', id],
    queryFn: async () => await getOneContract(id),
    enabled: !!id,
    gcTime: 240000,
    staleTime: 240000,
  })
}

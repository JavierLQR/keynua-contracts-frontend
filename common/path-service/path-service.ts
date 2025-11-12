const PATH_SERVICES = {
  API: process.env.NEXT_PUBLIC_API || 'http://localhost:4000/api-v1',
  CONTRACTS: '/contracts',
} as const

export const { API, CONTRACTS } = PATH_SERVICES

import { UseFormReturn } from 'react-hook-form'

import { UserListDynamic } from './contract-user-list-dynamic'
import { DocumentFormValues } from '../schema/contract-schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  form: UseFormReturn<DocumentFormValues>
}

const ContractFirmantes = ({ form }: Props) => {
  return (
    <>
      <Card className="mt-4">
        <CardHeader className="pb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-muted-foreground">
              4.
            </span>
            <div>
              <CardTitle className="text-xl">Firmantes</CardTitle>
              <CardDescription>
                Agrega firmantes para el contrato.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <UserListDynamic form={form} />
        </CardContent>
      </Card>
    </>
  )
}

export default ContractFirmantes

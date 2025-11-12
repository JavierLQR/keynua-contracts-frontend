'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { expirationOptions } from '../data/options'
import { SectionDocumentDataProps } from '../types/contract-form-type'

export const SectionDocumentData = ({
  form,
  expirationTime,
}: SectionDocumentDataProps) => {
  const now = new Date()
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            1.
          </span>
          <div>
            <CardTitle className="text-xl">Datos del Contrato</CardTitle>
            <CardDescription>
              Ingresa los datos correspondientes al contrato.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del Contrato</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Contrato de Servicios" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referencia</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: REF-2025-001" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe brevemente el propósito del documento..."
                  className="min-h-24 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expirationInHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiempo de Expiración</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)

                  if (value !== 'custom')
                    form.setValue('expirationDatetime', '')
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tiempo..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expirationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {expirationTime === 'custom' && (
          <FormField
            control={form.control}
            name="expirationDatetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona Fecha y Hora</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    step={'60'}
                    min={localNow}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  )
}

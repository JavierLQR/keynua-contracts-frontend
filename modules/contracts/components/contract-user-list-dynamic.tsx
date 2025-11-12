'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PhoneInput } from 'react-international-phone'

import { DocumentFormValues } from '../schema/contract-schema'

export const UserListDynamic = ({
  form,
}: {
  form: UseFormReturn<DocumentFormValues>
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users',
  })

  const notificationType = useWatch({
    control: form.control,
    name: 'chosenNotificationOptions',
  })[0]

  useEffect(() => {
    const users = form.getValues('users')

    const updatedUsers = users.map((user) => {
      const cleanUser = { ...user }

      if (!['email', 'email+sms', 'email+whatsapp'].includes(notificationType))
        delete cleanUser.email

      if (
        !['sms', 'whatsapp', 'email+sms', 'email+whatsapp'].includes(
          notificationType
        )
      )
        delete cleanUser.phone

      return cleanUser
    })

    form.setValue('users', updatedUsers)
  }, [notificationType, form])

  const handleAddUser = () => {
    if (!notificationType) {
      toast.error('Selecciona primero un canal de notificación.')
      return
    }

    const newUser: DocumentFormValues['users'][0] = {
      name: '',
      groups: ['signers'],
    }

    if (['email', 'email+sms', 'email+whatsapp'].includes(notificationType))
      newUser.email = undefined

    if (
      ['sms', 'whatsapp', 'email+sms', 'email+whatsapp'].includes(
        notificationType
      )
    )
      newUser.phone = undefined

    append(newUser)
  }

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border rounded-lg p-4 space-y-4 relative bg-muted/50"
        >
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          {/* Nombre completo */}
          <FormField
            control={form.control}
            name={`users.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Javier Rojas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          {['email', 'email+sms', 'email+whatsapp'].includes(
            notificationType
          ) && (
            <FormField
              control={form.control}
              name={`users.${index}.email`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="javier@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Teléfono con selector de país */}
          {['sms', 'whatsapp', 'email+sms', 'email+whatsapp'].includes(
            notificationType
          ) && (
            <FormField
              control={form.control}
              name={`users.${index}.phone`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono / WhatsApp</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="pe" // 👈 Perú por defecto
                      value={field.value || ''}
                      onChange={(value) => field.onChange(value)}
                      inputClassName="!w-full !h-10 !text-sm !border !border-input !rounded-md !px-3 focus:!outline-none focus:!ring-2 focus:!ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        disabled={fields.length >= 2}
        onClick={handleAddUser}
      >
        + Agregar firmante
      </Button>
    </div>
  )
}

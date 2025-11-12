'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Bell } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { DocumentFormValues } from '../schema/contract-schema'
import { AlertFrequencySelector } from './contract-alert-frequency-selector'
import { RepeatCountSelector } from './contract-count-selector'
import { NotificationSelector } from './contract-notification-select'

interface ReminderAlertsSectionProps {
  form: UseFormReturn<DocumentFormValues>
}

export const ReminderAlertsSection = ({ form }: ReminderAlertsSectionProps) => {
  const enabled = form.watch('flags.remindersData.enabled')

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-foreground">
            Alertas de recordatorio
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Configura la frecuencia (en minutos) y el número máximo de alertas
            para recordar a los firmantes si aún no han completado la firma.
          </p>
        </div>
        <FormField
          control={form.control}
          name="flags.remindersData.enabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {enabled && (
        <div className="space-y-4 pt-4 border-t">
          <FormField
            control={form.control}
            name="flags.remindersData.frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frecuencia de alertas</FormLabel>
                <FormControl>
                  <AlertFrequencySelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flags.remindersData.maxAttempts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de veces</FormLabel>
                <FormControl>
                  <RepeatCountSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <FormField
        control={form.control}
        name="chosenNotificationOptions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Canal de notificación</FormLabel>
            <FormControl>
              <NotificationSelector
                value={field.value?.[0] || ''}
                onChange={(value) => field.onChange([value])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  )
}

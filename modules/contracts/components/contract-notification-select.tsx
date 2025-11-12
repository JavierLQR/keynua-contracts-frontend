'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface NotificationSelectorProps {
  value: string
  onChange: (value: string) => void
}

export const NotificationSelector = ({
  value,
  onChange,
}: NotificationSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Selecciona un canal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="email">Solo Email</SelectItem>
        <SelectItem value="sms">Solo SMS</SelectItem>
        <SelectItem value="whatsapp">Solo WhatsApp</SelectItem>
        <SelectItem value="email+sms">Email + SMS</SelectItem>
        <SelectItem value="email+whatsapp">Email + WhatsApp</SelectItem>
      </SelectContent>
    </Select>
  )
}

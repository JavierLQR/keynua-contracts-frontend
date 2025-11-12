'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FREQUENCY_OPTIONS } from '../data/options'

interface AlertFrequencySelectorProps {
  value: number
  onChange: (value: number) => void
}

export const AlertFrequencySelector = ({
  value,
  onChange,
}: AlertFrequencySelectorProps) => {
  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Selecciona frecuencia" />
      </SelectTrigger>
      <SelectContent>
        {FREQUENCY_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value.toString()}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

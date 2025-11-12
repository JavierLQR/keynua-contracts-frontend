'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RepeatCountSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function RepeatCountSelector({
  value,
  onChange,
}: RepeatCountSelectorProps) {
  const options = Array.from({ length: 20 }, (_, i) => i + 1)

  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona cantidad" />
      </SelectTrigger>

      <SelectContent>
        {options.map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num === 1 ? `${num} sola vez` : `${num} veces`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

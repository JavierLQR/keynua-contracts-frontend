'use client'

import { Card } from '@/components/ui/card'

import { SignatureProcessSelectorProps } from '../types/contract-form-type'
import { PROCESS_OPTIONS } from '../data/options'

export const SignatureProcessSelector = ({
  value,
  onChange,
}: SignatureProcessSelectorProps) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-foreground mb-2">
        3. Este es tu proceso de firma
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        El proceso de firma ya está configurado.
      </p>

      <div className="space-y-3">
        {PROCESS_OPTIONS.map((option) => (
          <Card
            key={option.id}
            className={`p-4 cursor-pointer transition-all ${
              value === option.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onChange(option.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5 text-primary">{option.icon}</div>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-foreground">
                    {option.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

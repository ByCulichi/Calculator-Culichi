import React from 'react'
import { CalculatorEngine } from '../utils/calculator-engine'

interface DisplayProps {
  value: string
}

export function Display({ value }: DisplayProps) {
  const displayValue = CalculatorEngine.formatDisplay(value)

  return (
    <div
      className="h-32 flex items-end justify-end px-6 mb-6 mt-3"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="text-white text-5xl font-extralight tracking-tight text-right leading-none">
        {displayValue}
      </div>
    </div>
  )
}

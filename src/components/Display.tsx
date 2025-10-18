import { useEffect, useState } from 'react'
import { CalculatorEngine } from '../utils/calculator-engine'

interface DisplayProps {
  value: string
}

export function Display({ value }: DisplayProps) {
  const displayValue = CalculatorEngine.formatDisplay(value)
  const [fontSize, setFontSize] = useState('text-7xl')

  useEffect(() => {
    const length = displayValue.length
    if (length <= 6) {
      setFontSize('text-7xl')
    } else if (length <= 8) {
      setFontSize('text-6xl')
    } else if (length <= 10) {
      setFontSize('text-5xl')
    } else if (length <= 12) {
      setFontSize('text-4xl')
    } else {
      setFontSize('text-3xl')
    }
  }, [displayValue])

  return (
    <div
      className="h-40 flex items-end justify-end px-8 pb-4 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-testid="calculator-display"
    >
      <div
        className={`text-white ${fontSize} font-extralight tracking-tighter text-right leading-none transition-all duration-200 break-all`}
      >
        {displayValue}
      </div>
    </div>
  )
}

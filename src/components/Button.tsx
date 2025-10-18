import React from 'react'

interface ButtonProps {
  value: string
  onClick: (value: string) => void
  variant?: 'number' | 'operator' | 'function' | 'equals'
  className?: string
  ariaLabel?: string
}

export function Button({
  value,
  onClick,
  variant = 'number',
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseClasses =
    'h-20 rounded-full font-normal transition-all duration-150 flex items-center justify-center text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-95'

  const variantClasses = {
    number: 'bg-calc-button text-white hover:bg-calc-button-hover',
    operator: 'bg-calc-button-op text-white hover:bg-calc-button-op-hover',
    function: 'bg-calc-button-ac text-black hover:bg-calc-button-ac-hover',
    equals: 'bg-calc-button-op text-white hover:bg-calc-button-op-hover',
  }

  return (
    <button
      onClick={() => onClick(value)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel || value}
      type="button"
    >
      {value}
    </button>
  )
}

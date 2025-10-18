interface ButtonProps {
  value: string
  onClick: (value: string) => void
  variant?: 'number' | 'operator' | 'function' | 'equals'
  className?: string
  ariaLabel?: string
  isActive?: boolean
  testId?: string
}

export function Button({
  value,
  onClick,
  variant = 'number',
  className = '',
  ariaLabel,
  isActive = false,
  testId,
}: ButtonProps) {
  const baseClasses =
    'h-20 rounded-full font-normal transition-all duration-100 flex items-center justify-center text-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 select-none cursor-pointer'

  const variantClasses = {
    number: `bg-calc-button text-white hover:bg-calc-button-hover active:brightness-75 ${isActive ? 'brightness-75' : ''}`,
    operator: isActive
      ? 'bg-white text-calc-button-op'
      : 'bg-calc-button-op text-white hover:brightness-110 active:brightness-90',
    function: `bg-calc-button-ac text-black hover:bg-calc-button-ac-hover active:brightness-90 ${isActive ? 'brightness-90' : ''}`,
    equals: `bg-calc-button-op text-white hover:brightness-110 active:brightness-90 ${isActive ? 'brightness-90' : ''}`,
  }

  return (
    <button
      onClick={() => onClick(value)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel || value}
      aria-pressed={isActive}
      data-testid={testId || `button-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      type="button"
    >
      <span className="pointer-events-none">{value}</span>
    </button>
  )
}

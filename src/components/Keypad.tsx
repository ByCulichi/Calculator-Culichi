import React from 'react'
import { Button } from './Button'
import type { Operator, CalculatorMode } from '../types/calculator'

interface KeypadProps {
  onNumberClick: (digit: string) => void
  onOperatorClick: (operator: Operator) => void
  onEqualsClick: () => void
  onClearClick: () => void
  onToggleSignClick: () => void
  onPercentageClick: () => void
  onDecimalClick: () => void
  mode: CalculatorMode
}

export function Keypad({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
  onToggleSignClick,
  onPercentageClick,
  onDecimalClick,
  mode,
}: KeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-3 px-5 pb-6">
      <Button value="AC" onClick={onClearClick} variant="function" />
      <Button
        value="+/−"
        onClick={onToggleSignClick}
        variant="function"
        ariaLabel="Toggle sign"
      />
      <Button
        value="%"
        onClick={onPercentageClick}
        variant="function"
        ariaLabel="Percentage"
      />
      <Button
        value="÷"
        onClick={() => onOperatorClick('÷')}
        variant="operator"
        ariaLabel="Divide"
      />

      <Button value="7" onClick={() => onNumberClick('7')} />
      <Button value="8" onClick={() => onNumberClick('8')} />
      <Button value="9" onClick={() => onNumberClick('9')} />
      <Button
        value="×"
        onClick={() => onOperatorClick('×')}
        variant="operator"
        ariaLabel="Multiply"
      />

      <Button value="4" onClick={() => onNumberClick('4')} />
      <Button value="5" onClick={() => onNumberClick('5')} />
      <Button value="6" onClick={() => onNumberClick('6')} />
      <Button
        value="−"
        onClick={() => onOperatorClick('−')}
        variant="operator"
        ariaLabel="Subtract"
      />

      <Button value="1" onClick={() => onNumberClick('1')} />
      <Button value="2" onClick={() => onNumberClick('2')} />
      <Button value="3" onClick={() => onNumberClick('3')} />
      <Button
        value="+"
        onClick={() => onOperatorClick('+')}
        variant="operator"
        ariaLabel="Add"
      />

      <Button
        value="0"
        onClick={() => onNumberClick('0')}
        className="col-span-2"
      />
      <Button
        value="."
        onClick={onDecimalClick}
        ariaLabel="Decimal point"
      />
      <Button
        value="="
        onClick={onEqualsClick}
        variant="equals"
        ariaLabel="Equals"
      />
    </div>
  )
}

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
  activeOperator: Operator | null
}

export function Keypad({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
  onToggleSignClick,
  onPercentageClick,
  onDecimalClick,
  activeOperator,
}: KeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-3 px-6 pb-6" data-testid="calculator-keypad">
      <Button
        value="AC"
        onClick={onClearClick}
        variant="function"
        testId="button-clear"
      />
      <Button
        value="+/−"
        onClick={onToggleSignClick}
        variant="function"
        ariaLabel="Toggle sign"
        testId="button-toggle-sign"
      />
      <Button
        value="%"
        onClick={onPercentageClick}
        variant="function"
        ariaLabel="Percentage"
        testId="button-percentage"
      />
      <Button
        value="÷"
        onClick={() => onOperatorClick('÷')}
        variant="operator"
        ariaLabel="Divide"
        isActive={activeOperator === '÷'}
        testId="button-divide"
      />

      <Button value="7" onClick={() => onNumberClick('7')} testId="button-7" />
      <Button value="8" onClick={() => onNumberClick('8')} testId="button-8" />
      <Button value="9" onClick={() => onNumberClick('9')} testId="button-9" />
      <Button
        value="×"
        onClick={() => onOperatorClick('×')}
        variant="operator"
        ariaLabel="Multiply"
        isActive={activeOperator === '×'}
        testId="button-multiply"
      />

      <Button value="4" onClick={() => onNumberClick('4')} testId="button-4" />
      <Button value="5" onClick={() => onNumberClick('5')} testId="button-5" />
      <Button value="6" onClick={() => onNumberClick('6')} testId="button-6" />
      <Button
        value="−"
        onClick={() => onOperatorClick('−')}
        variant="operator"
        ariaLabel="Subtract"
        isActive={activeOperator === '−'}
        testId="button-subtract"
      />

      <Button value="1" onClick={() => onNumberClick('1')} testId="button-1" />
      <Button value="2" onClick={() => onNumberClick('2')} testId="button-2" />
      <Button value="3" onClick={() => onNumberClick('3')} testId="button-3" />
      <Button
        value="+"
        onClick={() => onOperatorClick('+')}
        variant="operator"
        ariaLabel="Add"
        isActive={activeOperator === '+'}
        testId="button-add"
      />

      <Button
        value="0"
        onClick={() => onNumberClick('0')}
        className="col-span-2 justify-start pl-8"
        testId="button-0"
      />
      <Button
        value="."
        onClick={onDecimalClick}
        ariaLabel="Decimal point"
        testId="button-decimal"
      />
      <Button
        value="="
        onClick={onEqualsClick}
        variant="equals"
        ariaLabel="Equals"
        testId="button-equals"
      />
    </div>
  )
}

export type Operator = '+' | '−' | '×' | '÷'

export type CalculatorMode = 'basic' | 'scientific' | 'conversion'

export interface CalculatorState {
  buffer: string
  runningTotal: string
  previousOperator: Operator | null
  history: string[]
  mode: CalculatorMode
  shouldResetBuffer: boolean
}

export type CalculatorAction =
  | { type: 'NUMBER_INPUT'; payload: string }
  | { type: 'OPERATOR'; payload: Operator }
  | { type: 'EQUALS' }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENTAGE' }
  | { type: 'DECIMAL' }
  | { type: 'BACKSPACE' }
  | { type: 'SCIENTIFIC_FUNCTION'; payload: string }
  | { type: 'CONVERSION'; payload: string }
  | { type: 'CHANGE_MODE'; payload: CalculatorMode }
  | { type: 'CLEAR_HISTORY' }

export interface HistoryEntry {
  expression: string
  result: string
}

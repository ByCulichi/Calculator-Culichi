import { useReducer } from 'react'
import type {
  CalculatorState,
  CalculatorAction,
  Operator,
} from '../types/calculator'
import { CalculatorEngine } from '../utils/calculator-engine'

const initialState: CalculatorState = {
  buffer: '0',
  runningTotal: '0',
  previousOperator: null,
  history: [],
  mode: 'basic',
  shouldResetBuffer: false,
}

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case 'NUMBER_INPUT': {
      const digit = action.payload
      if (state.shouldResetBuffer) {
        return { ...state, buffer: digit, shouldResetBuffer: false }
      }
      const newBuffer = state.buffer === '0' ? digit : state.buffer + digit
      return { ...state, buffer: newBuffer }
    }

    case 'DECIMAL': {
      if (state.shouldResetBuffer) {
        return { ...state, buffer: '0.', shouldResetBuffer: false }
      }
      if (state.buffer.includes('.')) {
        return state
      }
      return { ...state, buffer: state.buffer + '.' }
    }

    case 'TOGGLE_SIGN': {
      if (state.buffer === '0') return state
      const newBuffer = CalculatorEngine.toggleSign(state.buffer)
      return { ...state, buffer: newBuffer }
    }

    case 'PERCENTAGE': {
      const newBuffer = CalculatorEngine.percentage(state.buffer)
      return { ...state, buffer: newBuffer }
    }

    case 'OPERATOR': {
      const operator = action.payload
      if (state.buffer === '0' && state.runningTotal === '0') {
        return state
      }

      let newRunningTotal = state.runningTotal

      if (state.previousOperator && state.runningTotal !== '0') {
        try {
          newRunningTotal = CalculatorEngine.applyOperation(
            state.runningTotal,
            state.buffer,
            state.previousOperator
          )
        } catch (error) {
          return { ...state, buffer: 'Error', shouldResetBuffer: true }
        }
      } else {
        newRunningTotal = state.buffer
      }

      return {
        ...state,
        runningTotal: newRunningTotal,
        buffer: newRunningTotal,
        previousOperator: operator,
        shouldResetBuffer: true,
      }
    }

    case 'EQUALS': {
      if (!state.previousOperator || state.runningTotal === '0') {
        return state
      }

      try {
        const result = CalculatorEngine.applyOperation(
          state.runningTotal,
          state.buffer,
          state.previousOperator
        )

        const historyEntry = `${state.runningTotal} ${state.previousOperator} ${state.buffer} = ${result}`

        const newHistory =
          state.history[state.history.length - 1] === historyEntry
            ? state.history
            : [...state.history, historyEntry]

        return {
          ...state,
          buffer: result,
          runningTotal: '0',
          previousOperator: null,
          history: newHistory,
          shouldResetBuffer: true,
        }
      } catch (error) {
        return { ...state, buffer: 'Error', shouldResetBuffer: true }
      }
    }

    case 'CLEAR': {
      return { ...initialState, history: state.history, mode: state.mode }
    }

    case 'BACKSPACE': {
      if (state.buffer.length === 1) {
        return { ...state, buffer: '0' }
      }
      return { ...state, buffer: state.buffer.slice(0, -1) }
    }

    case 'SCIENTIFIC_FUNCTION': {
      const func = action.payload
      try {
        let result: string
        switch (func) {
          case 'sin':
            result = CalculatorEngine.sin(state.buffer)
            break
          case 'cos':
            result = CalculatorEngine.cos(state.buffer)
            break
          case 'tan':
            result = CalculatorEngine.tan(state.buffer)
            break
          case 'log':
            result = CalculatorEngine.log(state.buffer)
            break
          case 'ln':
            result = CalculatorEngine.ln(state.buffer)
            break
          case '√':
            result = CalculatorEngine.sqrt(state.buffer)
            break
          case 'x²':
            result = CalculatorEngine.square(state.buffer)
            break
          case 'π':
            result = Math.PI.toString()
            break
          case 'e':
            result = Math.E.toString()
            break
          default:
            return state
        }
        return { ...state, buffer: result, shouldResetBuffer: true }
      } catch (error) {
        return { ...state, buffer: 'Error', shouldResetBuffer: true }
      }
    }

    case 'CONVERSION': {
      const conversion = action.payload
      try {
        let result: string
        switch (conversion) {
          case '°C→°F':
            result = CalculatorEngine.celsiusToFahrenheit(state.buffer)
            break
          case 'km→mi':
            result = CalculatorEngine.kmToMiles(state.buffer)
            break
          case 'kg→lb':
            result = CalculatorEngine.kgToLbs(state.buffer)
            break
          case 'm→ft':
            result = CalculatorEngine.metersToFeet(state.buffer)
            break
          default:
            return state
        }
        return { ...state, buffer: result, shouldResetBuffer: true }
      } catch (error) {
        return { ...state, buffer: 'Error', shouldResetBuffer: true }
      }
    }

    case 'CHANGE_MODE': {
      return { ...state, mode: action.payload }
    }

    case 'CLEAR_HISTORY': {
      return { ...state, history: [] }
    }

    default:
      return state
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  return { state, dispatch }
}

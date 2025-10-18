import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from './useCalculator'

describe('useCalculator', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCalculator())

    expect(result.current.state.buffer).toBe('0')
    expect(result.current.state.runningTotal).toBe('0')
    expect(result.current.state.previousOperator).toBe(null)
    expect(result.current.state.history).toEqual([])
  })

  describe('Number Input', () => {
    it('should handle number input', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
      })

      expect(result.current.state.buffer).toBe('5')
    })

    it('should append digits', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '1' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '2' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
      })

      expect(result.current.state.buffer).toBe('123')
    })
  })

  describe('Basic Operations', () => {
    it('should perform addition', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'OPERATOR', payload: '+' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.buffer).toBe('8')
    })

    it('should perform subtraction', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '1' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '0' })
        result.current.dispatch({ type: 'OPERATOR', payload: '−' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.buffer).toBe('7')
    })

    it('should perform multiplication', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'OPERATOR', payload: '×' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.buffer).toBe('15')
    })

    it('should perform division', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '1' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '0' })
        result.current.dispatch({ type: 'OPERATOR', payload: '÷' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '2' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.buffer).toBe('5')
    })
  })

  describe('Decimal Precision', () => {
    it('should handle 0.1 + 0.2 correctly', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '0' })
        result.current.dispatch({ type: 'DECIMAL' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '1' })
        result.current.dispatch({ type: 'OPERATOR', payload: '+' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '0' })
        result.current.dispatch({ type: 'DECIMAL' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '2' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.buffer).toBe('0.3')
    })
  })

  describe('Decimal Point', () => {
    it('should add decimal point', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'DECIMAL' })
      })

      expect(result.current.state.buffer).toBe('5.')
    })

    it('should not add multiple decimal points', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'DECIMAL' })
        result.current.dispatch({ type: 'DECIMAL' })
      })

      expect(result.current.state.buffer).toBe('5.')
    })
  })

  describe('Clear and Backspace', () => {
    it('should clear calculator', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'CLEAR' })
      })

      expect(result.current.state.buffer).toBe('0')
      expect(result.current.state.runningTotal).toBe('0')
    })

    it('should handle backspace', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '1' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '2' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'BACKSPACE' })
      })

      expect(result.current.state.buffer).toBe('12')
    })
  })

  describe('Toggle Sign and Percentage', () => {
    it('should toggle sign', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'TOGGLE_SIGN' })
      })

      expect(result.current.state.buffer).toBe('-5')
    })

    it('should convert to percentage', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '0' })
        result.current.dispatch({ type: 'PERCENTAGE' })
      })

      expect(result.current.state.buffer).toBe('0.5')
    })
  })

  describe('History', () => {
    it('should add calculation to history', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'OPERATOR', payload: '+' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'EQUALS' })
      })

      expect(result.current.state.history).toHaveLength(1)
      expect(result.current.state.history[0]).toBe('5 + 3 = 8')
    })

    it('should clear history', () => {
      const { result } = renderHook(() => useCalculator())

      act(() => {
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '5' })
        result.current.dispatch({ type: 'OPERATOR', payload: '+' })
        result.current.dispatch({ type: 'NUMBER_INPUT', payload: '3' })
        result.current.dispatch({ type: 'EQUALS' })
        result.current.dispatch({ type: 'CLEAR_HISTORY' })
      })

      expect(result.current.state.history).toHaveLength(0)
    })
  })
})

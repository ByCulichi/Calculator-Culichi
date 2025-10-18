import React, { useEffect, useCallback } from 'react'
import { Display } from './Display'
import { Keypad } from './Keypad'
import { useCalculator } from '../hooks/useCalculator'
import type { Operator } from '../types/calculator'

export function Calculator() {
  const { state, dispatch } = useCalculator()

  const handleNumberClick = useCallback(
    (digit: string) => {
      dispatch({ type: 'NUMBER_INPUT', payload: digit })
    },
    [dispatch]
  )

  const handleOperatorClick = useCallback(
    (operator: Operator) => {
      dispatch({ type: 'OPERATOR', payload: operator })
    },
    [dispatch]
  )

  const handleEqualsClick = useCallback(() => {
    dispatch({ type: 'EQUALS' })
  }, [dispatch])

  const handleClearClick = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [dispatch])

  const handleToggleSignClick = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIGN' })
  }, [dispatch])

  const handlePercentageClick = useCallback(() => {
    dispatch({ type: 'PERCENTAGE' })
  }, [dispatch])

  const handleDecimalClick = useCallback(() => {
    dispatch({ type: 'DECIMAL' })
  }, [dispatch])

  const handleBackspaceClick = useCallback(() => {
    dispatch({ type: 'BACKSPACE' })
  }, [dispatch])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key

      if (key >= '0' && key <= '9') {
        handleNumberClick(key)
      } else if (key === '+') {
        handleOperatorClick('+')
      } else if (key === '-') {
        handleOperatorClick('−')
      } else if (key === '*') {
        handleOperatorClick('×')
      } else if (key === '/') {
        event.preventDefault()
        handleOperatorClick('÷')
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault()
        handleEqualsClick()
      } else if (key === 'Escape') {
        handleClearClick()
      } else if (key === 'Backspace') {
        handleBackspaceClick()
      } else if (key === '.') {
        handleDecimalClick()
      } else if (key === '%') {
        handlePercentageClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    handleNumberClick,
    handleOperatorClick,
    handleEqualsClick,
    handleClearClick,
    handleBackspaceClick,
    handleDecimalClick,
    handlePercentageClick,
  ])

  return (
    <div
      className="bg-calc-panel rounded-3xl w-full max-w-md shadow-2xl"
      role="application"
      aria-label="Calculator"
    >
      <Display value={state.buffer} />
      <Keypad
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onEqualsClick={handleEqualsClick}
        onClearClick={handleClearClick}
        onToggleSignClick={handleToggleSignClick}
        onPercentageClick={handlePercentageClick}
        onDecimalClick={handleDecimalClick}
        mode={state.mode}
      />
    </div>
  )
}

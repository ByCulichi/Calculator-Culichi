import { describe, it, expect } from 'vitest'
import { CalculatorEngine } from './calculator-engine'

describe('CalculatorEngine', () => {
  describe('Basic Operations', () => {
    it('should add two numbers correctly', () => {
      expect(CalculatorEngine.add('5', '3')).toBe('8')
      expect(CalculatorEngine.add('0.1', '0.2')).toBe('0.3')
    })

    it('should subtract two numbers correctly', () => {
      expect(CalculatorEngine.subtract('10', '3')).toBe('7')
      expect(CalculatorEngine.subtract('0.3', '0.1')).toBe('0.2')
    })

    it('should multiply two numbers correctly', () => {
      expect(CalculatorEngine.multiply('5', '3')).toBe('15')
      expect(CalculatorEngine.multiply('0.1', '0.2')).toBe('0.02')
    })

    it('should divide two numbers correctly', () => {
      expect(CalculatorEngine.divide('10', '2')).toBe('5')
      expect(CalculatorEngine.divide('1', '3')).toBe('0.33333333333333333333')
    })

    it('should throw error when dividing by zero', () => {
      expect(() => CalculatorEngine.divide('10', '0')).toThrow(
        'Division by zero'
      )
    })

    it('should handle decimal precision correctly', () => {
      expect(CalculatorEngine.add('0.1', '0.2')).toBe('0.3')
      expect(CalculatorEngine.subtract('1', '0.9')).toBe('0.1')
      expect(CalculatorEngine.multiply('0.2', '0.1')).toBe('0.02')
    })
  })

  describe('Operations via applyOperation', () => {
    it('should apply addition', () => {
      expect(CalculatorEngine.applyOperation('5', '3', '+')).toBe('8')
    })

    it('should apply subtraction', () => {
      expect(CalculatorEngine.applyOperation('10', '3', '−')).toBe('7')
    })

    it('should apply multiplication', () => {
      expect(CalculatorEngine.applyOperation('5', '3', '×')).toBe('15')
    })

    it('should apply division', () => {
      expect(CalculatorEngine.applyOperation('10', '2', '÷')).toBe('5')
    })
  })

  describe('Percentage and Sign', () => {
    it('should convert to percentage', () => {
      expect(CalculatorEngine.percentage('50')).toBe('0.5')
      expect(CalculatorEngine.percentage('100')).toBe('1')
    })

    it('should toggle sign', () => {
      expect(CalculatorEngine.toggleSign('5')).toBe('-5')
      expect(CalculatorEngine.toggleSign('-5')).toBe('5')
    })
  })

  describe('Scientific Functions', () => {
    it('should calculate sine', () => {
      const result = CalculatorEngine.sin('90')
      expect(parseFloat(result)).toBeCloseTo(1, 5)
    })

    it('should calculate cosine', () => {
      const result = CalculatorEngine.cos('0')
      expect(parseFloat(result)).toBeCloseTo(1, 5)
    })

    it('should calculate tangent', () => {
      const result = CalculatorEngine.tan('45')
      expect(parseFloat(result)).toBeCloseTo(1, 5)
    })

    it('should calculate logarithm', () => {
      expect(CalculatorEngine.log('100')).toBe('2')
      expect(CalculatorEngine.log('1000')).toBe('3')
    })

    it('should calculate natural logarithm', () => {
      const result = CalculatorEngine.ln(Math.E.toString())
      expect(parseFloat(result)).toBeCloseTo(1, 5)
    })

    it('should calculate square root', () => {
      expect(CalculatorEngine.sqrt('16')).toBe('4')
      expect(CalculatorEngine.sqrt('2')).toBe('1.4142135623730950488')
    })

    it('should calculate square', () => {
      expect(CalculatorEngine.square('5')).toBe('25')
      expect(CalculatorEngine.square('0.5')).toBe('0.25')
    })
  })

  describe('Unit Conversions', () => {
    it('should convert Celsius to Fahrenheit', () => {
      expect(CalculatorEngine.celsiusToFahrenheit('0')).toBe('32')
      expect(CalculatorEngine.celsiusToFahrenheit('100')).toBe('212')
    })

    it('should convert kilometers to miles', () => {
      const result = parseFloat(CalculatorEngine.kmToMiles('10'))
      expect(result).toBeCloseTo(6.21371, 4)
    })

    it('should convert kilograms to pounds', () => {
      const result = parseFloat(CalculatorEngine.kgToLbs('10'))
      expect(result).toBeCloseTo(22.0462, 4)
    })

    it('should convert meters to feet', () => {
      const result = parseFloat(CalculatorEngine.metersToFeet('10'))
      expect(result).toBeCloseTo(32.8084, 4)
    })
  })

  describe('Display Formatting', () => {
    it('should format positive numbers correctly', () => {
      expect(CalculatorEngine.formatDisplay('123')).toBe('123')
      expect(CalculatorEngine.formatDisplay('0')).toBe('0')
    })

    it('should format negative numbers with parentheses', () => {
      expect(CalculatorEngine.formatDisplay('-123')).toBe('(-123)')
    })

    it('should handle zero correctly', () => {
      expect(CalculatorEngine.formatDisplay('0')).toBe('0')
    })
  })
})

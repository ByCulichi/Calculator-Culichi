import Decimal from 'decimal.js-light'
import type { Operator } from '../types/calculator'

export class CalculatorEngine {
  static add(a: string, b: string): string {
    return new Decimal(a).plus(new Decimal(b)).toString()
  }

  static subtract(a: string, b: string): string {
    return new Decimal(a).minus(new Decimal(b)).toString()
  }

  static multiply(a: string, b: string): string {
    return new Decimal(a).times(new Decimal(b)).toString()
  }

  static divide(a: string, b: string): string {
    if (new Decimal(b).equals(0)) {
      throw new Error('Division by zero')
    }
    return new Decimal(a).dividedBy(new Decimal(b)).toString()
  }

  static applyOperation(a: string, b: string, operator: Operator): string {
    switch (operator) {
      case '+':
        return this.add(a, b)
      case '−':
        return this.subtract(a, b)
      case '×':
        return this.multiply(a, b)
      case '÷':
        return this.divide(a, b)
      default:
        throw new Error(`Unknown operator: ${operator}`)
    }
  }

  static percentage(value: string): string {
    return new Decimal(value).dividedBy(100).toString()
  }

  static toggleSign(value: string): string {
    return new Decimal(value).negated().toString()
  }

  static sin(value: string): string {
    const radians = new Decimal(value).times(Math.PI).dividedBy(180)
    return new Decimal(Math.sin(radians.toNumber())).toString()
  }

  static cos(value: string): string {
    const radians = new Decimal(value).times(Math.PI).dividedBy(180)
    return new Decimal(Math.cos(radians.toNumber())).toString()
  }

  static tan(value: string): string {
    const radians = new Decimal(value).times(Math.PI).dividedBy(180)
    return new Decimal(Math.tan(radians.toNumber())).toString()
  }

  static log(value: string): string {
    return new Decimal(Math.log10(new Decimal(value).toNumber())).toString()
  }

  static ln(value: string): string {
    return new Decimal(Math.log(new Decimal(value).toNumber())).toString()
  }

  static sqrt(value: string): string {
    return new Decimal(value).sqrt().toString()
  }

  static square(value: string): string {
    return new Decimal(value).pow(2).toString()
  }

  static celsiusToFahrenheit(celsius: string): string {
    return new Decimal(celsius).times(9).dividedBy(5).plus(32).toString()
  }

  static kmToMiles(km: string): string {
    return new Decimal(km).times(0.621371).toString()
  }

  static kgToLbs(kg: string): string {
    return new Decimal(kg).times(2.20462).toString()
  }

  static metersToFeet(meters: string): string {
    return new Decimal(meters).times(3.28084).toString()
  }

  static formatDisplay(value: string): string {
    if (!value || value === '0') return '0'
    
    const decimal = new Decimal(value)
    
    if (decimal.isNegative() && value !== '0') {
      return `(${value})`
    }
    
    return value
  }
}

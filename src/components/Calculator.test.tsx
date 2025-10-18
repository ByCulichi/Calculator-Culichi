import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calculator } from './Calculator'

describe('Calculator Component', () => {
  it('should render calculator with initial display of 0', () => {
    render(<Calculator />)
    expect(screen.getByRole('status')).toHaveTextContent('0')
  })

  it('should display number when clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    const button5 = screen.getByRole('button', { name: '5' })
    await user.click(button5)

    expect(screen.getByRole('status')).toHaveTextContent('5')
  })

  it('should perform addition', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))

    expect(screen.getByRole('status')).toHaveTextContent('8')
  })

  it('should perform subtraction', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: 'Subtract' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))

    expect(screen.getByRole('status')).toHaveTextContent('7')
  })

  it('should perform multiplication', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'Multiply' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))

    expect(screen.getByRole('status')).toHaveTextContent('15')
  })

  it('should perform division', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: 'Divide' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: 'Equals' }))

    expect(screen.getByRole('status')).toHaveTextContent('5')
  })

  it('should clear display when AC is clicked', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'AC' }))

    expect(screen.getByRole('status')).toHaveTextContent('0')
  })

  it('should toggle sign', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'Toggle sign' }))

    expect(screen.getByRole('status')).toHaveTextContent('(-5)')
  })

  it('should add decimal point', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.click(screen.getByRole('button', { name: '5' }))
    await user.click(screen.getByRole('button', { name: 'Decimal point' }))
    await user.click(screen.getByRole('button', { name: '5' }))

    expect(screen.getByRole('status')).toHaveTextContent('5.5')
  })

  it('should handle keyboard input', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.keyboard('5')
    expect(screen.getByRole('status')).toHaveTextContent('5')

    await user.keyboard('+')
    await user.keyboard('3')
    await user.keyboard('{Enter}')

    expect(screen.getByRole('status')).toHaveTextContent('8')
  })

  it('should handle decimal precision (0.1 + 0.2)', async () => {
    const user = userEvent.setup()
    render(<Calculator />)

    await user.keyboard('0.1+0.2{Enter}')
    expect(screen.getByRole('status')).toHaveTextContent('0.3')
  })
})

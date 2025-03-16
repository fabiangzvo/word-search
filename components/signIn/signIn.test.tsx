import { it, describe, expect, vi, Mock } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { signIn } from 'next-auth/react'

import SignIn from './index'

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

global.alert = vi.fn()

const mockSingIn = signIn as Mock

describe('<SignIn />', () => {
  it('debe mostrar un alert de error', async () => {
    mockSingIn.mockResolvedValue({ error: 'Invalid credentials' })

    render(<SignIn />)

    const emailInput = screen.getByPlaceholderText('tu@email.com')
    const passwordInput = screen.getByPlaceholderText('tu contraseña')
    const button = screen.getByRole('button', { name: 'Ingresar' })

    await act(() => {
      fireEvent.change(emailInput, { target: { value: 'chupelo' } })
      fireEvent.change(passwordInput, {
        target: { value: 'camila chupa monda' },
      })

      fireEvent.click(button)
    })

    //expect(screen.getByText('Invalid credentials')).toD
  })
})

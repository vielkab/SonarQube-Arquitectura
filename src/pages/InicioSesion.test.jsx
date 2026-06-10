import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InicioSesion from './InicioSesion'

describe('InicioSesion page', () => {
  test('renders login form and updates email input', () => {
    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/Email:/i)
    const passwordInput = screen.getByLabelText(/Contraseña:/i)
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
    expect(emailInput.value).toBe('user@example.com')
  })
})

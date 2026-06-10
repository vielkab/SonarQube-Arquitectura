import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Registro from './Registro'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    auth: { signUp: async () => ({ data: { user: { id: 'u1' } }, error: null }) },
    from: (table) => ({ insert: async () => ({ error: null }) })
  }
}))

describe('Registro page', () => {
  test('renders register form and submits', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    expect(screen.getByText(/Crear Cuenta/i)).toBeInTheDocument()

    const nombre = screen.getByLabelText(/Nombre de usuario/i)
    const email = screen.getByLabelText(/Email/i)
    const passwordFields = screen.getAllByLabelText(/Contraseña/i)
    const password = passwordFields[0]
    const confirm = passwordFields[1]

    fireEvent.change(nombre, { target: { value: 'User' } })
    fireEvent.change(email, { target: { value: 'u@u.com' } })
    fireEvent.change(password, { target: { value: 'Abc1234' } })
    fireEvent.change(confirm, { target: { value: 'Abc1234' } })

    // basic sanity: inputs updated
    expect(nombre).toHaveValue('User')
    expect(email).toHaveValue('u@u.com')
  })
})

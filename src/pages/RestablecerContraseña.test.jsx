import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RestablecerContraseña from './RestablecerContraseña'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    auth: {
      verifyOtp: async () => ({ error: null }),
      exchangeCodeForSession: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
      updateUser: async () => ({ error: null })
    }
  }
}))

describe('RestablecerContraseña page', () => {
  test('renders instruction when not ready', async () => {
    render(
      <MemoryRouter>
        <RestablecerContraseña />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText(/Abre el enlace del correo de recuperación/i)).toBeInTheDocument())
  })
})

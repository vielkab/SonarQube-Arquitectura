import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import SupabaseDebug from './SupabaseDebug'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } })
    }
  }
}))

describe('SupabaseDebug component', () => {
  test('shows connected-but-not-authenticated status when no session', async () => {
    render(<SupabaseDebug />)

    await waitFor(() => expect(screen.getByText(/Conectado pero no autenticado/i)).toBeInTheDocument())
    expect(screen.getByText(/Detalles técnicos/i)).toBeInTheDocument()
  })
})

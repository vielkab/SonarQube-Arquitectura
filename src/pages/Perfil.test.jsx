import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Perfil from './Perfil'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: { id: 1, nombre: 'Usuario Test', bio: 'bio' }, error: null }),
          order: async () => ({ data: [{ id: 5, comentario: 'Nice', created_at: new Date().toISOString(), juegos: { nombre: 'G' } }], error: null })
        })
      }),
      delete: () => ({ eq: async () => ({ error: null }) })
    }),
    auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }) }
  }
}))

describe('Perfil page', () => {
  test('renders profile and reseñas', async () => {
    render(<Perfil user={{ id: 1, email: 'u@u' }} />)

    expect(screen.getByText(/Cargando perfil/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Mi Perfil/i)).toBeInTheDocument())
    expect(screen.getByText(/Usuario Test/i)).toBeInTheDocument()
    expect(screen.getByText(/Nice/i)).toBeInTheDocument()
  })
})

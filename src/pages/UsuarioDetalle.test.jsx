import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import UsuarioDetalle from './UsuarioDetalle'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: { id: 1, nombre: 'User', email: 'u@u' }, error: null }),
          order: async () => ({ data: [{ id: 2, comentario: 'Nice', created_at: new Date().toISOString(), juegos: { nombre: 'G' } }], error: null })
        })
      })
    })
  }
}))

describe('UsuarioDetalle page', () => {
  test('renders user profile and reseñas', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario/1"]}>
        <Routes>
          <Route path="/usuario/:id" element={<UsuarioDetalle />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Cargando perfil/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Perfil de usuario/i)).toBeInTheDocument())
    expect(screen.getByText(/User/i)).toBeInTheDocument()
    expect(screen.getByText(/Nice/i)).toBeInTheDocument()
  })
})

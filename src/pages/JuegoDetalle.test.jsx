import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import JuegoDetalle from './JuegoDetalle'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: { id: 1, nombre: 'Test Game', cover_url: '', desarrollador: 'Dev', año_lanzamiento: 2020, descripcion: 'Desc' }, error: null }),
          order: async () => ({ data: [{ id: 10, comentario: 'Great', created_at: new Date().toISOString(), juegos: { nombre: 'Test Game' } }], error: null })
        })
      })
    })
  }
}))

describe('JuegoDetalle page', () => {
  test('renders juego details and reseñas', async () => {
    render(
      <MemoryRouter initialEntries={["/juego/1"]}>
        <Routes>
          <Route path="/juego/:id" element={<JuegoDetalle />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Cargando juego/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Descripción del juego/i)).toBeInTheDocument())
    expect(screen.getAllByText(/Test Game/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Great/i)).toBeInTheDocument()
  })
})

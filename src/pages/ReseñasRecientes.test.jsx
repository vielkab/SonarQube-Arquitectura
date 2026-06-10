import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReseñasRecientes from './ReseñasRecientes'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: () => ({ select: () => ({ order: async () => ({ data: [{ id: 1, comentario: 'Nice review', created_at: new Date().toISOString(), usuarios: { nombre: 'U' }, juegos: { nombre: 'G' } }], error: null }) }) })
  }
}))

describe('ReseñasRecientes page', () => {
  test('renders recent reseñas', async () => {
    render(
      <MemoryRouter>
        <ReseñasRecientes />
      </MemoryRouter>
    )

    expect(screen.getByText(/Cargando reseñas/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Reseñas Recientes/i)).toBeInTheDocument())
    expect(screen.getByText(/Nice review/i)).toBeInTheDocument()
  })
})

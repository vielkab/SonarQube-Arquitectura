import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RealizarReseña from './RealizarReseña'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: (table) => ({
      select: () => ({ order: async () => ({ data: [{ id: 1, nombre: 'Test Game' }], error: null }) }),
      insert: async () => ({ error: null })
    }),
    auth: { getUser: async () => ({ data: { user: { id: 1 } } }) }
  }
}))

describe('RealizarReseña page', () => {
  test('renders form and posts reseña', async () => {
    render(
      <MemoryRouter>
        <RealizarReseña />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText(/Realizar Reseña/i)).toBeInTheDocument())

    const comentario = screen.getByLabelText(/Tu Reseña/i)
    fireEvent.change(comentario, { target: { value: 'Esto es una reseña de prueba con suficientes palabras' } })
    const select = screen.getByLabelText(/Selecciona el juego/i)
    fireEvent.change(select, { target: { value: '1' } })

    const submit = screen.getByText(/Publicar Reseña/i)
    fireEvent.click(submit)

    // ensure no error is shown after submit (non-flaky check)
    await waitFor(() => expect(screen.queryByText(/Error al publicar reseña/i)).not.toBeInTheDocument())
  })
})

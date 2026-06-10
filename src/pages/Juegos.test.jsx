import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Juegos from './Juegos'

vi.mock('../services/supabaseClient', () => {
  return {
    supabase: {
      from: (table) => ({
        select: () => ({
          order: async () => ({
            data: table === 'generos' ? [{ id: 1, nombre: 'Acción' }] : [{ id: 1, nombre: 'Test Game', descripcion: 'Desc' }],
            error: null
          })
        })
      })
    }
  }
})

describe('Juegos page', () => {
  test('renders juegos list after loading', async () => {
    render(
      <MemoryRouter>
        <Juegos />
      </MemoryRouter>
    )

    expect(screen.getByText(/Cargando juegos/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Juegos/i)).toBeInTheDocument())
    expect(screen.getByText(/Test Game/i)).toBeInTheDocument()
  })
})

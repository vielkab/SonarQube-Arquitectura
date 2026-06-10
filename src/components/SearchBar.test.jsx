import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchBar from './SearchBar'

vi.mock('../services/supabaseClient', () => ({
  supabase: {
    from: (table) => ({
      select: () => ({
        ilike: () => ({ limit: async () => ({ data: table === 'usuarios' ? [{ id: 1, nombre: 'User', email: 'u@u.com' }] : [{ id: 2, nombre: 'Game' }], error: null }) })
      })
    })
  }
}))

describe('SearchBar component', () => {
  test('renders input and does not show results by default', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Buscar usuarios, juegos.../i)
    expect(input).toBeInTheDocument()
    expect(screen.queryByText(/No hay resultados/i)).not.toBeInTheDocument()
  })

  test('shows results when typing a query', async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Buscar usuarios, juegos/i)
    fireEvent.change(input, { target: { value: 'Test' } })

    // debounce is 300ms; wait for results
    await waitFor(() => expect(screen.getByText(/Usuarios/i)).toBeInTheDocument(), { timeout: 1500 })
    expect(screen.getByText(/User/i)).toBeInTheDocument()
    expect(screen.getByText(/Game/i)).toBeInTheDocument()
  })
})

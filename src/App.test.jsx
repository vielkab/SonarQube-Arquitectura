import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

vi.mock('./services/supabaseClient', () => {
  const auth = {
    getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
    onAuthStateChange: vi.fn((callback) => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
  }

  return {
    supabase: { auth }
  }
})

describe('App component', () => {
  test('renders loading state then home page when no session exists', async () => {
    render(<App />)

    expect(screen.getByText(/⏳ Cargando/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/La reseña que sientes, no que puntúas/i)).toBeInTheDocument()
    })
  })
})

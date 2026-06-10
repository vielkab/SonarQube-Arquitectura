import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home page', () => {
  test('renders hero and featured games sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(/La reseña que sientes, no que puntúas/i)).toBeInTheDocument()
    expect(screen.getByText(/Juegos Destacados/i)).toBeInTheDocument()
    expect(screen.getByText(/Elden Ring/i)).toBeInTheDocument()
  })
})

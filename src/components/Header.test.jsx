import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header component', () => {
  test('renders logout and profile links when a user is present', () => {
    render(
      <MemoryRouter>
        <Header user={{ id: 1 }} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Cerrar Sesión/i)).toBeInTheDocument()
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument()
  })

  test('renders login and register links when no user is present', () => {
    render(
      <MemoryRouter>
        <Header user={false} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument()
    expect(screen.getByText(/Registro/i)).toBeInTheDocument()
  })
})

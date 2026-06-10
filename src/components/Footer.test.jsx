import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
  test('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/GamesGauges/i)).toBeInTheDocument()
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument()
  })
})

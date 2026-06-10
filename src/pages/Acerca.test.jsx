import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Acerca from './Acerca'

describe('Acerca page', () => {
  test('renders the mission and contact sections', () => {
    render(<Acerca />)
    expect(screen.getByText(/Nuestra Misión/i)).toBeInTheDocument()
    expect(screen.getByText(/Características/i)).toBeInTheDocument()
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument()
    expect(screen.getByText(/info@gamesgauges.com/i)).toBeInTheDocument()
  })
})

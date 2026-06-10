import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ValidacionesDemo from './ValidacionesDemo'

describe('ValidacionesDemo component', () => {
  test('renders textarea and shows invalid feedback for short review', () => {
    render(<ValidacionesDemo />)

    const textarea = screen.getByPlaceholderText(/Escribe aquí tu reseña de prueba/i)
    expect(textarea).toBeInTheDocument()

    fireEvent.change(textarea, { target: { value: 'Hola' } })
    expect(screen.getByText(/INVÁLIDO/i)).toBeInTheDocument()
    expect(screen.getByText(/La reseña debe tener al menos 5 palabras/i)).toBeInTheDocument()
  })
})

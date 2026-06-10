import '@testing-library/jest-dom'
import {
  validarRequerido,
  validarFormatoEmail,
  actualizarErrorEmail,
  validarPasswordCompleja,
  validarConfirmacionClave,
  validarResena
} from './validations'

describe('validations utilities', () => {
  test('validarRequerido returns invalid when value is empty', () => {
    expect(validarRequerido('')).toEqual({
      isValid: false,
      errorMessage: 'Este campo es requerido'
    })
  })

  test('validarFormatoEmail rejects invalid email and accepts valid email', () => {
    expect(validarFormatoEmail('bad-email')).toEqual({
      isValid: false,
      errorMessage: 'Por favor, ingresa un email válido'
    })
    expect(validarFormatoEmail('user@example.com')).toEqual({ isValid: true })
  })

  test('actualizarErrorEmail removes email error when valid', () => {
    const errors = { email: 'error', password: 'required' }
    expect(actualizarErrorEmail(errors, 'user@example.com')).toEqual({ password: 'required' })
    expect(actualizarErrorEmail(errors, 'bad-email')).toEqual({
      email: 'Por favor, ingresa un email válido',
      password: 'required'
    })
  })

  test('validarPasswordCompleja validates a strong password', () => {
    expect(validarPasswordCompleja('Test1')).toEqual({
      isValid: false,
      errorMessage: 'La contraseña debe tener al menos 6 caracteres'
    })
    expect(validarPasswordCompleja('test123')).toEqual({
      isValid: false,
      errorMessage: 'La contraseña debe contener al menos una mayúscula'
    })
    expect(validarPasswordCompleja('Testtest')).toEqual({
      isValid: false,
      errorMessage: 'La contraseña debe contener al menos un número'
    })
    expect(validarPasswordCompleja('Test123')).toEqual({ isValid: true })
  })

  test('validarConfirmacionClave checks matching passwords', () => {
    expect(validarConfirmacionClave('Test123', 'Test456')).toEqual({
      isValid: false,
      errorMessage: 'Las contraseñas no coinciden'
    })
    expect(validarConfirmacionClave('Test123', 'Test123')).toEqual({ isValid: true })
  })

  test('validarResena validates review length and content restrictions', () => {
    expect(validarResena('Hola')).toMatchObject({
      isValid: false,
      errorCode: 'TOO_SHORT'
    })
    expect(validarResena('Este texto contiene un enlace http://example.com')).toMatchObject({
      isValid: false,
      errorCode: 'CONTAINS_LINK'
    })
    expect(validarResena('ESTO ES TODO EN MAYÚSCULAS PARA PROBAR EL ERROR')).toMatchObject({
      isValid: false,
      errorCode: 'ALL_UPPERCASE'
    })
    expect(validarResena('Esta reseña es válida con suficientes palabras y sin malas palabras')).toMatchObject({
      isValid: true
    })
  })
})

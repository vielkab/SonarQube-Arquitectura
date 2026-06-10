import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

describe('main entrypoint', () => {
  test('creates root and renders App', () => {
    document.body.innerHTML = '<div id="root"></div>'
    const root = { render: vi.fn() }
    vi.spyOn(ReactDOM, 'createRoot').mockReturnValue(root)

    return import('./main.jsx').then(() => {
      expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'))
      expect(root.render).toHaveBeenCalledWith(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    })
  })
})

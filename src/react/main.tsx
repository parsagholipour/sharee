import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

export default function initReact() {
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <App />
  )
}

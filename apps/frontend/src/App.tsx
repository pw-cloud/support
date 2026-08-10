import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Backend responded with an error')
        }
        return response.json() as Promise<HealthResponse>
      })
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Support App</p>
        <h1>Frontend ↔ Backend</h1>
        <p className="description">
          Die React-Ansicht ruft den NestJS-Health-Endpoint direkt auf.
        </p>

        <div className="status-box">
          {health ? (
            <>
              <span className="status-dot online" />
              <strong>Backend status:</strong> {health.status}
            </>
          ) : error ? (
            <>
              <span className="status-dot offline" />
              <strong>Fehler:</strong> {error}
            </>
          ) : (
            <>
              <span className="status-dot pending" />
              Verbinde mit dem Backend...
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default App

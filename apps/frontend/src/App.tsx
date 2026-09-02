import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
  timestamp: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadHealth() {
      try {
        setError(null)

        const response = await fetch('/api/health')

        if (!response.ok) {
          throw new Error('Backend API responded with an error')
        }

        const data = (await response.json()) as HealthResponse

        if (!cancelled) {
          setHealth(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Unbekannter Fehler',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadHealth()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Support App</p>
        <h1>Fullstack Monorepo Starter</h1>
        <p className="description">
          Neutrales Startkonstrukt mit NestJS-Backend und React-Frontend.
        </p>

        <div className="status-box">
          <span
            className={`status-dot ${health ? 'online' : error ? 'offline' : 'pending'}`}
          />
          <div className="status-copy">
            <strong>
              {error ? 'Backend nicht erreichbar' : 'Backend-Status'}
            </strong>
            <span>
              {loading
                ? 'Wird geprüft...'
                : health
                  ? `Online · ${health.timestamp}`
                  : 'Offline'}
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

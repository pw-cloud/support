import { useEffect, useState } from 'react'
import './App.css'

type KnowledgeEntry = {
  id: string
  title: string
  summary: string | null
  content: string
  problem: string | null
  cause: string | null
  solution: string | null
  technicalDetails: string | null
  entryType: string
  status: string
  verificationStatus: string
  categoryId: string | null
  createdAt: string
  updatedAt: string
}

function App() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/knowledge')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Knowledge API responded with an error')
        }
        return response.json() as Promise<KnowledgeEntry[]>
      })
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Support App</p>
        <h1>IT Knowledge Base</h1>

        {loading ? (
          <p>Knowledge-Einträge werden geladen...</p>
        ) : error ? (
          <div className="status-box">
            <span className="status-dot offline" />
            <strong>Fehler:</strong> {error}
          </div>
        ) : (
          <>
            <p className="description">
              {entries.length} Knowledge-Einträge aus dem Backend.
            </p>

            <div className="knowledge-list">
              {entries.map((entry) => (
                <article className="knowledge-entry" key={entry.id}>
                  <h2>{entry.title}</h2>

                  {entry.summary && <p>{entry.summary}</p>}

                  <small>
                    Typ: {entry.entryType} · Status: {entry.status} ·
                    Verifikation: {entry.verificationStatus}
                  </small>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App

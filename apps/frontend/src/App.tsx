import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
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

type KnowledgeForm = {
  title: string
  summary: string
  content: string
  problem: string
  cause: string
  solution: string
  technicalDetails: string
  entryType: string
  status: string
  verificationStatus: string
}

const emptyForm: KnowledgeForm = {
  title: '',
  summary: '',
  content: '',
  problem: '',
  cause: '',
  solution: '',
  technicalDetails: '',
  entryType: 'PROBLEM',
  status: 'DRAFT',
  verificationStatus: 'UNVERIFIED',
}

function App() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [form, setForm] = useState<KnowledgeForm>(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function loadEntries() {
    try {
      setError(null)

      const response = await fetch('/api/knowledge')

      if (!response.ok) {
        throw new Error('Knowledge API responded with an error')
      }

      const data = (await response.json()) as KnowledgeEntry[]
      setEntries(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadEntries()
  }, [])

  function updateField(
    field: keyof KnowledgeForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Knowledge-Eintrag konnte nicht gespeichert werden')
      }

      setForm(emptyForm)
      setShowForm(false)
      await loadEntries()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Support App</p>

        <h1>IT Knowledge Base</h1>

        <div className="toolbar">
          <p className="description">
            {entries.length} Knowledge-Einträge aus dem Backend.
          </p>

          <button
            type="button"
            onClick={() => {
              setForm(emptyForm)
              setShowForm(true)
              setError(null)
            }}
          >
            Neuer Eintrag
          </button>
        </div>

        {error && (
          <div className="status-box">
            <strong>Fehler:</strong> {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="knowledge-form">
            <h2>Neuer Knowledge-Eintrag</h2>

            <label>
              Titel *
              <input
                value={form.title}
                onChange={(event) =>
                  updateField('title', event.target.value)
                }
                required
                minLength={3}
              />
            </label>

            <label>
              Zusammenfassung
              <input
                value={form.summary}
                onChange={(event) =>
                  updateField('summary', event.target.value)
                }
              />
            </label>

            <label>
              Inhalt *
              <textarea
                value={form.content}
                onChange={(event) =>
                  updateField('content', event.target.value)
                }
                required
                minLength={3}
                rows={5}
              />
            </label>

            <label>
              Problem
              <textarea
                value={form.problem}
                onChange={(event) =>
                  updateField('problem', event.target.value)
                }
                rows={3}
              />
            </label>

            <label>
              Ursache
              <textarea
                value={form.cause}
                onChange={(event) =>
                  updateField('cause', event.target.value)
                }
                rows={3}
              />
            </label>

            <label>
              Lösung
              <textarea
                value={form.solution}
                onChange={(event) =>
                  updateField('solution', event.target.value)
                }
                rows={3}
              />
            </label>

            <label>
              Technische Details
              <textarea
                value={form.technicalDetails}
                onChange={(event) =>
                  updateField('technicalDetails', event.target.value)
                }
                rows={3}
              />
            </label>

            <label>
              Typ
              <select
                value={form.entryType}
                onChange={(event) =>
                  updateField('entryType', event.target.value)
                }
              >
                <option value="PROBLEM">Problem</option>
                <option value="SOLUTION">Lösung</option>
                <option value="GUIDE">Anleitung</option>
                <option value="ARCHITECTURE">Architektur</option>
                <option value="CONFIGURATION">Konfiguration</option>
                <option value="REFERENCE">Referenz</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  updateField('status', event.target.value)
                }
              >
                <option value="DRAFT">Entwurf</option>
                <option value="VERIFIED">Verifiziert</option>
                <option value="PUBLISHED">Veröffentlicht</option>
                <option value="ARCHIVED">Archiviert</option>
              </select>
            </label>

            <label>
              Verifikation
              <select
                value={form.verificationStatus}
                onChange={(event) =>
                  updateField(
                    'verificationStatus',
                    event.target.value,
                  )
                }
              >
                <option value="UNVERIFIED">Unverifiziert</option>
                <option value="OBSERVED">Beobachtet</option>
                <option value="TESTED">Getestet</option>
                <option value="CONFIRMED">Bestätigt</option>
              </select>
            </label>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={saving}
              >
                Abbrechen
              </button>

              <button type="submit" disabled={saving}>
                {saving ? 'Speichern...' : 'Speichern'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Knowledge-Einträge werden geladen...</p>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <h2>Noch keine Knowledge-Einträge</h2>
            <p>
              Die Wissensbank ist leer. Lege den ersten Eintrag an.
            </p>
          </div>
        ) : (
          <div className="knowledge-list">
            {entries.map((entry) => (
              <article
                className="knowledge-entry"
                key={entry.id}
              >
                <h2>{entry.title}</h2>

                {entry.summary && <p>{entry.summary}</p>}

                <small>
                  Typ: {entry.entryType} · Status: {entry.status} ·
                  Verifikation: {entry.verificationStatus}
                </small>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
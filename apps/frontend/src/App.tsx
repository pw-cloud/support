import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type KnowledgeEntry = {
  id: string
  title: string | null
  summary: string | null
  content: string | null
  category: string | null
  manufacturer: string | null
  model: string | null
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
  category: string
  manufacturer: string
  model: string
  problem: string
  cause: string
  solution: string
  status: string
}

const emptyForm: KnowledgeForm = {
  category: 'PC',
  manufacturer: '',
  model: '',
  problem: '',
  cause: '',
  solution: '',
  status: 'NEW',
}

function App() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [form, setForm] = useState<KnowledgeForm>(emptyForm)
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEntries = entries.filter((entry) => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return true
    }

    return [
      entry.title,
      entry.summary,
      entry.content,
      entry.problem,
      entry.cause,
      entry.solution,
      entry.technicalDetails,
    ]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query))
  })

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

  function updateField(field: keyof KnowledgeForm, value: string) {
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
      const payload = {
        ...form,
        title: `${form.category} - ${form.manufacturer || 'Hersteller'} ${form.model || 'Modell'}`.trim(),
        content: `${form.problem}\n\nUrsache:\n${form.cause || 'Nicht angegeben'}\n\nLösung:\n${form.solution || 'Nicht angegeben'}`,
      }

      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(
          message || 'Knowledge-Eintrag konnte nicht gespeichert werden',
        )
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

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Möchtest du diesen Knowledge-Eintrag wirklich löschen?',
    )

    if (!confirmed) {
      return
    }

    try {
      setError(null)
      const response = await fetch(`/api/knowledge/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Eintrag konnte nicht gelöscht werden')
      }

      if (selectedEntry?.id === id) {
        setSelectedEntry(null)
      }

      await loadEntries()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    }
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString('de-DE')
  }

  if (selectedEntry) {
    return (
      <main className="app-shell">
        <section className="card">
          <button
            type="button"
            onClick={() => setSelectedEntry(null)}
          >
            ← Zurück zur Übersicht
          </button>

          <p className="eyebrow">Knowledge-Eintrag</p>

          <h1>{selectedEntry.title ?? `${selectedEntry.category ?? 'Eintrag'} ${selectedEntry.manufacturer ?? ''} ${selectedEntry.model ?? ''}`.trim()}</h1>

          <div className="entry-meta">
            <span>Kategorie: {selectedEntry.category ?? 'Sonstige'}</span>
            <span>Hersteller/Modell: {selectedEntry.manufacturer ?? '—'} / {selectedEntry.model ?? '—'}</span>
            <span>Status: {selectedEntry.status}</span>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="danger-button"
              onClick={() => handleDelete(selectedEntry.id)}
            >
              Eintrag löschen
            </button>
          </div>

          <section className="detail-section">
            <h2>Problem Beschreibung</h2>
            <p className="preserve-whitespace">
              {selectedEntry.problem ?? selectedEntry.content ?? 'Keine Problem-Beschreibung hinterlegt.'}
            </p>
          </section>

          {selectedEntry.cause && (
            <section className="detail-section">
              <h2>Ursache</h2>
              <p className="preserve-whitespace">
                {selectedEntry.cause}
              </p>
            </section>
          )}

          {selectedEntry.cause && (
            <section className="detail-section">
              <h2>Ursache</h2>
              <p className="preserve-whitespace">
                {selectedEntry.cause}
              </p>
            </section>
          )}

          {selectedEntry.solution && (
            <section className="detail-section">
              <h2>Lösung</h2>
              <p className="preserve-whitespace">
                {selectedEntry.solution}
              </p>
            </section>
          )}

          {!selectedEntry.solution && !selectedEntry.cause && (
            <section className="detail-section">
              <h2>Lösung</h2>
              <p>Keine Lösung hinterlegt.</p>
            </section>
          )}

          {selectedEntry.technicalDetails && (
            <section className="detail-section">
              <h2>Technische Details</h2>
              <p className="preserve-whitespace">
                {selectedEntry.technicalDetails}
              </p>
            </section>
          )}

          <div className="entry-dates">
            <small>
              Erstellt: {formatDate(selectedEntry.createdAt)}
            </small>
            <small>
              Zuletzt geändert: {formatDate(selectedEntry.updatedAt)}
            </small>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Support App</p>

        <h1>IT Knowledge Base</h1>

        <div className="toolbar">
          <p className="description">
            {filteredEntries.length} von {entries.length} Einträgen sichtbar.
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

        <label className="search-field">
          <span>Suche</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Titel, Problem, Lösung, Inhalt..."
          />
        </label>

        {error && (
          <div className="status-box">
            <strong>Fehler:</strong> {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="knowledge-form">
            <h2>Neuer Knowledge-Eintrag</h2>

            <label>
              Kategorie
              <select
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
              >
                <option value="PC">PC</option>
                <option value="PRINTER">Drucker</option>
                <option value="MDE">MDE</option>
                <option value="NETWORK">Netzwerk</option>
                <option value="OTHER">Sonstige</option>
              </select>
            </label>

            <label>
              Hersteller
              <input
                value={form.manufacturer}
                onChange={(event) =>
                  updateField('manufacturer', event.target.value)
                }
                placeholder="z. B. Lenovo"
              />
            </label>

            <label>
              Modell
              <input
                value={form.model}
                onChange={(event) =>
                  updateField('model', event.target.value)
                }
                placeholder="z. B. ThinkPad T14"
              />
            </label>

            <label>
              Problem Beschreibung
              <textarea
                value={form.problem}
                onChange={(event) =>
                  updateField('problem', event.target.value)
                }
                required
                rows={4}
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
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  updateField('status', event.target.value)
                }
              >
                <option value="NEW">Neu</option>
                <option value="CONFIRMED">Bestätigt</option>
                <option value="ARCHIVED">Archiviert</option>
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
        ) : filteredEntries.length === 0 ? (
          <div className="empty-state">
            <h2>Keine passenden Einträge</h2>
            <p>
              {entries.length === 0
                ? 'Die Wissensbank ist leer. Lege den ersten Eintrag an.'
                : 'Für diesen Suchbegriff wurden keine Einträge gefunden.'}
            </p>
          </div>
        ) : (
          <div className="knowledge-list">
            {filteredEntries.map((entry) => (
              <article
                className="knowledge-entry"
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
              >
                <h2>
                  {entry.title ??
                    `${entry.category ?? 'Sonstige'} - ${entry.manufacturer ?? 'Hersteller'} ${entry.model ?? ''}`.trim()}
                </h2>

                <p>
                  {entry.problem ?? 'Keine Problem-Beschreibung hinterlegt.'}
                </p>

                <small>
                  Kategorie: {entry.category ?? 'Sonstige'} · Hersteller/Modell: {entry.manufacturer ?? '—'} / {entry.model ?? '—'} · Status: {entry.status}
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
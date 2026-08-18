import { useState } from 'react'
import type { FormEvent } from 'react'

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

type KnowledgeFormProps = {
	onCreated: (entry: KnowledgeEntry) => void
}

function KnowledgeForm({ onCreated }: KnowledgeFormProps) {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setSaving(true)
		setError(null)

		try {
			const response = await fetch('/api/knowledge', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, summary, content }),
			})

			if (!response.ok) {
				throw new Error('Knowledge-Eintrag konnte nicht gespeichert werden')
			}

			onCreated((await response.json()) as KnowledgeEntry)
			setTitle('')
			setSummary('')
			setContent('')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form className="knowledge-form" onSubmit={handleSubmit}>
			<h2>Neuen Eintrag erstellen</h2>

			<label>
				Titel
				<input
					required
					minLength={3}
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</label>

			<label>
				Zusammenfassung
				<input value={summary} onChange={(event) => setSummary(event.target.value)} />
			</label>

			<label>
				Inhalt
				<textarea
					required
					minLength={3}
					value={content}
					onChange={(event) => setContent(event.target.value)}
					rows={5}
				/>
			</label>

			{error && <p className="form-error">{error}</p>}

			<button type="submit" disabled={saving}>
				{saving ? 'Wird gespeichert...' : 'Eintrag speichern'}
			</button>
		</form>
	)
}

export default KnowledgeForm

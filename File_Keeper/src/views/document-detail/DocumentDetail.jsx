import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDocuments } from '../../state/DocumentContext.jsx'
import LabelChip from '../../components/labeler/LabelChip.jsx'
import Button from '../../components/common/Button.jsx'
import { formatDate } from '../../utils/helpers/index.js'
import './DocumentDetail.css'

const SUGGESTED_LABELS = ['invoice', 'receipt', 'contract', 'id', 'personal', 'business', 'utility', 'housing', 'medical', 'tax', 'other']

export default function DocumentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { documents, updateDocument, removeDocument } = useDocuments()
  const doc = useMemo(() => documents.find(d => d.id === id), [documents, id])
  const [newLabel, setNewLabel] = useState('')
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(doc?.title ?? '')

  if (!doc) {
    return (
      <div className="view-placeholder">
        <h2>Document not found</h2>
        <p>The document <code>{id}</code> does not exist.</p>
        <Link to="/gallery" className="back-link">← Back to Gallery</Link>
      </div>
    )
  }

  const addLabel = (label) => {
    const l = label.trim().toLowerCase()
    if (!l || doc.labels.includes(l)) return
    updateDocument(doc.id, { labels: [...doc.labels, l] })
    setNewLabel('')
  }

  const removeLabel = (label) => {
    updateDocument(doc.id, { labels: doc.labels.filter(l => l !== label) })
  }

  const saveTitle = () => {
    const t = titleDraft.trim()
    if (t && t !== doc.title) updateDocument(doc.id, { title: t })
    setEditingTitle(false)
  }

  const suggestions = SUGGESTED_LABELS.filter(s => !doc.labels.includes(s))

  const onDelete = () => {
    if (confirm('Delete this document? This cannot be undone.')) {
      removeDocument(doc.id)
      navigate('/gallery')
    }
  }

  return (
    <div className="document-detail">
      <Link to="/gallery" className="back-link">← Back to Gallery</Link>

      <div className="detail-preview" aria-label="Document preview">
        <div className="preview-page">
          <div className="preview-glyph">📄</div>
          <div className="preview-text">{doc.title}</div>
        </div>
      </div>

      <section className="detail-section">
        {editingTitle ? (
          <div className="title-edit">
            <input
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') setEditingTitle(false) }}
              autoFocus
              aria-label="Edit title"
            />
            <Button onClick={saveTitle}>Save</Button>
            <Button variant="secondary" onClick={() => { setEditingTitle(false); setTitleDraft(doc.title) }}>Cancel</Button>
          </div>
        ) : (
          <h2 className="detail-title" onClick={() => setEditingTitle(true)} title="Tap to edit">
            {doc.title}
          </h2>
        )}

        <dl className="detail-meta">
          <div><dt>Created</dt><dd>{formatDate(doc.createdAt)}</dd></div>
          <div><dt>Updated</dt><dd>{formatDate(doc.updatedAt)}</dd></div>
          <div><dt>ID</dt><dd><code>{doc.id}</code></dd></div>
        </dl>
      </section>

      <section className="detail-section">
        <h3>Labels</h3>
        {doc.labels.length === 0 ? (
          <p className="muted">No labels yet.</p>
        ) : (
          <div className="detail-labels">
            {doc.labels.map(l => (
              <LabelChip key={l} label={l} removable onRemove={removeLabel} />
            ))}
          </div>
        )}

        <form
          className="add-label-form"
          onSubmit={(e) => { e.preventDefault(); addLabel(newLabel) }}
        >
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Add a label…"
            aria-label="New label"
          />
          <Button type="submit" disabled={!newLabel.trim()}>Add</Button>
        </form>

        {suggestions.length > 0 && (
          <div className="suggestions">
            <span className="suggestions-label">Suggestions:</span>
            {suggestions.map(s => (
              <LabelChip key={s} label={s} onClick={() => addLabel(s)} />
            ))}
          </div>
        )}
      </section>

      <section className="detail-section danger-zone">
        <h3>Danger Zone</h3>
        <Button variant="danger" onClick={onDelete}>Delete Document</Button>
      </section>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { useDocuments } from '../../state/DocumentContext.jsx'
import DocumentCard from '../../components/gallery/DocumentCard.jsx'
import LabelChip from '../../components/labeler/LabelChip.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import { Link } from 'react-router-dom'
import './Gallery.css'

export default function Gallery() {
  const { documents } = useDocuments()
  const [query, setQuery] = useState('')
  const [activeLabel, setActiveLabel] = useState(null)
  const [sort, setSort] = useState('newest')

  const allLabels = useMemo(() => {
    const set = new Set()
    documents.forEach(d => d.labels.forEach(l => set.add(l)))
    return [...set].sort()
  }, [documents])

  const filtered = useMemo(() => {
    let list = documents
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.labels.some(l => l.toLowerCase().includes(q))
      )
    }
    if (activeLabel) list = list.filter(d => d.labels.includes(activeLabel))
    const sorted = [...list]
    if (sort === 'newest') sorted.sort((a, b) => b.updatedAt - a.updatedAt)
    if (sort === 'oldest') sorted.sort((a, b) => a.updatedAt - b.updatedAt)
    if (sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))
    return sorted
  }, [documents, query, activeLabel, sort])

  return (
    <div className="gallery">
      <div className="gallery-toolbar">
        <input
          type="search"
          className="gallery-search"
          placeholder="Search documents or labels…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search documents"
        />
        <select
          className="gallery-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort documents"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {allLabels.length > 0 && (
        <div className="gallery-filters">
          <LabelChip
            label="All"
            active={!activeLabel}
            onClick={() => setActiveLabel(null)}
          />
          {allLabels.map(l => (
            <LabelChip
              key={l}
              label={l}
              active={activeLabel === l}
              onClick={() => setActiveLabel(activeLabel === l ? null : l)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="🗂️"
          title="No documents found"
          message={documents.length === 0 ? 'Scan a document to get started.' : 'Try a different search or filter.'}
          action={<Link to="/scan" className="empty-cta">Scan a document</Link>}
        />
      ) : (
        <div className="gallery-grid">
          {filtered.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              activeLabel={activeLabel}
              onLabelClick={(l) => setActiveLabel(activeLabel === l ? null : l)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

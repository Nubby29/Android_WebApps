import { Link } from 'react-router-dom'
import LabelChip from '../labeler/LabelChip.jsx'
import { formatDate } from '../../utils/helpers/index.js'
import './DocumentCard.css'

export default function DocumentCard({ document: doc, onLabelClick, activeLabel }) {
  return (
    <Link to={`/documents/${doc.id}`} className="document-card">
      <div className="document-thumb" aria-hidden>
        <span className="document-thumb-glyph">📄</span>
      </div>
      <div className="document-meta">
        <div className="document-title" title={doc.title}>{doc.title}</div>
        <div className="document-date">{formatDate(doc.createdAt)}</div>
        {doc.labels?.length > 0 && (
          <div className="document-labels">
            {doc.labels.map(l => (
              <LabelChip
                key={l}
                label={l}
                active={activeLabel === l}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLabelClick?.(l) }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

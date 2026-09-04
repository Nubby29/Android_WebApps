import { useDocuments } from '../../state/DocumentContext.jsx'
import { Link } from 'react-router-dom'
import DocumentCard from '../../components/gallery/DocumentCard.jsx'
import Button from '../../components/common/Button.jsx'
import './Dashboard.css'

export default function Dashboard() {
  const { documents } = useDocuments()
  const recent = [...documents]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 3)

  const stats = {
    total: documents.length,
    labels: new Set(documents.flatMap(d => d.labels)).size,
    thisMonth: documents.filter(doc => {
      const now = new Date()
      const created = new Date(doc.createdAt)
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
    }).length
  }

  return (
    <div className="dashboard">
      <section className="hero">
        <h2>Welcome to File Keeper</h2>
        <p>Capture, organize, and auto-label your documents.</p>
        <Link to="/scan" className="cta">Start Scanning</Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.labels}</div>
          <div className="stat-label">Labels</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h3>Recent</h3>
          <Link to="/gallery" className="section-link">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="muted">No documents yet. Scan one to get started.</p>
        ) : (
          <div className="recent-grid">
            {recent.map(doc => <DocumentCard key={doc.id} document={doc} />)}
          </div>
        )}
      </section>

      <section className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-grid">
          <Link to="/scan" className="action-card">📷 New Scan</Link>
          <Link to="/gallery" className="action-card">🗂️ View Documents</Link>
          <Link to="/settings" className="action-card">⚙️ Settings</Link>
        </div>
      </section>

      <section className="status">
        <h3>Status</h3>
        <p>Phase 2 — Core UI Components: in progress</p>
        <Button variant="secondary" onClick={() => alert('Camera not implemented yet (Phase 3).')}>
          Try Capture
        </Button>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <section className="hero">
        <h2>Welcome to File Keeper</h2>
        <p>Capture, organize, and auto-label your documents.</p>
        <Link to="/scan" className="cta">Start Scanning</Link>
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
        <p>Phase 1 — Project Setup: in progress</p>
      </section>
    </div>
  )
}

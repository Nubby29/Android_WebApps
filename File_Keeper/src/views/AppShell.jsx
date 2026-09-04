import { Outlet, NavLink } from 'react-router-dom'
import './AppShell.css'

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">File Keeper</h1>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <nav className="app-nav" aria-label="Primary">
        <NavLink to="/" end className="nav-item">
          <span className="nav-icon" aria-hidden>🏠</span>
          <span className="nav-label">Home</span>
        </NavLink>
        <NavLink to="/scan" className="nav-item">
          <span className="nav-icon" aria-hidden>📷</span>
          <span className="nav-label">Scan</span>
        </NavLink>
        <NavLink to="/gallery" className="nav-item">
          <span className="nav-icon" aria-hidden>🗂️</span>
          <span className="nav-label">Gallery</span>
        </NavLink>
        <NavLink to="/settings" className="nav-item">
          <span className="nav-icon" aria-hidden>⚙️</span>
          <span className="nav-label">Settings</span>
        </NavLink>
      </nav>
    </div>
  )
}

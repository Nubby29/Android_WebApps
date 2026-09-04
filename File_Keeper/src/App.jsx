import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './views/AppShell.jsx'
import Dashboard from './views/main-view/Dashboard.jsx'
import CameraView from './views/camera-view/CameraView.jsx'
import Gallery from './views/gallery/Gallery.jsx'
import DocumentDetail from './views/document-detail/DocumentDetail.jsx'
import Settings from './views/settings-view/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scan" element={<CameraView />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

import { useState, useEffect } from 'react'
import Toggle from '../../components/common/Toggle.jsx'
import Button from '../../components/common/Button.jsx'
import { useDocuments } from '../../state/DocumentContext.jsx'
import './Settings.css'

const STORAGE_KEY = 'file-keeper-settings'

const DEFAULTS = {
  autoLabel: true,
  ocrEnabled: true,
  hapticFeedback: true,
  darkMode: true,
  saveOriginal: false
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { return DEFAULTS }
}

export default function Settings() {
  const { documents } = useDocuments()
  const [settings, setSettings] = useState(loadSettings)
  const [storageInfo, setStorageInfo] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then(setStorageInfo).catch(() => setStorageInfo(null))
    }
  }, [])

  const update = (key) => (val) => setSettings(s => ({ ...s, [key]: val }))

  const formatBytes = (b) => {
    if (!b && b !== 0) return '—'
    const units = ['B', 'KB', 'MB', 'GB']
    let i = 0
    let n = b
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
    return `${n.toFixed(1)} ${units[i]}`
  }

  return (
    <div className="settings">
      <section className="settings-section">
        <h3>Capture</h3>
        <Toggle
          label="Auto-label documents"
          description="Run classification on captured images"
          checked={settings.autoLabel}
          onChange={update('autoLabel')}
        />
        <Toggle
          label="Extract text (OCR)"
          description="Make documents searchable"
          checked={settings.ocrEnabled}
          onChange={update('ocrEnabled')}
        />
        <Toggle
          label="Save original image"
          description="Keep the uncropped scan in addition to the processed version"
          checked={settings.saveOriginal}
          onChange={update('saveOriginal')}
        />
      </section>

      <section className="settings-section">
        <h3>Appearance</h3>
        <Toggle
          label="Dark mode"
          description="Use the dark theme"
          checked={settings.darkMode}
          onChange={update('darkMode')}
        />
        <Toggle
          label="Haptic feedback"
          description="Vibrate on capture and actions"
          checked={settings.hapticFeedback}
          onChange={update('hapticFeedback')}
        />
      </section>

      <section className="settings-section">
        <h3>Storage</h3>
        <div className="storage-stats">
          <div className="stat">
            <div className="stat-value">{documents.length}</div>
            <div className="stat-label">Documents</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {storageInfo ? formatBytes(storageInfo.usage) : '—'}
            </div>
            <div className="stat-label">Used</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {storageInfo?.quota ? formatBytes(storageInfo.quota) : '—'}
            </div>
            <div className="stat-label">Quota</div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3>About</h3>
        <dl className="about-list">
          <div><dt>Version</dt><dd>0.1.0</dd></div>
          <div><dt>Phase</dt><dd>2 — Core UI Components</dd></div>
        </dl>
        <Button variant="secondary" onClick={() => {
          if (confirm('Reset all settings to defaults?')) setSettings(DEFAULTS)
        }}>Reset to defaults</Button>
      </section>
    </div>
  )
}

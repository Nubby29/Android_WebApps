import './Toggle.css'

export default function Toggle({ checked, onChange, label, description, id }) {
  const inputId = id || `toggle-${label?.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <label htmlFor={inputId} className="toggle-row">
      <span className="toggle-text">
        <span className="toggle-label">{label}</span>
        {description && <span className="toggle-description">{description}</span>}
      </span>
      <span className={`toggle-switch${checked ? ' on' : ''}`}>
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="toggle-knob" aria-hidden />
      </span>
    </label>
  )
}

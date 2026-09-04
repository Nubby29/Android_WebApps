import './LabelChip.css'

export default function LabelChip({ label, onClick, active = false, removable = false, onRemove }) {
  const className = `label-chip${active ? ' active' : ''}${onClick ? ' clickable' : ''}`
  const handle = onClick ? { onClick, role: 'button', tabIndex: 0 } : {}
  return (
    <span className={className} {...handle}>
      {label}
      {removable && (
        <button
          type="button"
          className="label-chip-remove"
          aria-label={`Remove ${label}`}
          onClick={(e) => { e.stopPropagation(); onRemove?.(label) }}
        >
          ×
        </button>
      )}
    </span>
  )
}

import { useParams } from 'react-router-dom'

export default function DocumentDetail() {
  const { id } = useParams()
  return (
    <div className="view-placeholder">
      <h2>Document</h2>
      <p>Detail view for document: <code>{id}</code></p>
    </div>
  )
}

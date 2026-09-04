import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocuments } from '../../state/DocumentContext.jsx'
import Button from '../../components/common/Button.jsx'
import './CameraView.css'

export default function CameraView() {
  const navigate = useNavigate()
  const { addDocument } = useDocuments()
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)

  const startCamera = async () => {
    setError(null)
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Camera not available in this browser.')
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setStreaming(true)
      }
    } catch (e) {
      setError(e.message || 'Failed to access camera.')
    }
  }

  const stopCamera = () => {
    const video = videoRef.current
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach(t => t.stop())
      video.srcObject = null
    }
    setStreaming(false)
  }

  const capture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const doc = addDocument({ title: `Scan ${new Date().toLocaleString()}` })
      console.log('Captured image for', doc.id, blob)
      stopCamera()
      navigate(`/documents/${doc.id}`)
    }, 'image/jpeg', 0.92)
  }

  const onFileSelected = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const doc = addDocument({ title: file.name.replace(/\.[^.]+$/, '') || 'Imported' })
    console.log('Imported file for', doc.id, file)
    e.target.value = ''
    navigate(`/documents/${doc.id}`)
  }

  return (
    <div className="camera-view">
      <div className="camera-viewport">
        {streaming ? (
          <video ref={videoRef} className="camera-video" playsInline muted />
        ) : (
          <div className="camera-placeholder">
            <div className="camera-glyph">📷</div>
            <p>Camera preview</p>
            <p className="muted">Live capture will be implemented in Phase 3.</p>
          </div>
        )}
        {error && <div className="camera-error" role="alert">{error}</div>}
      </div>

      <div className="camera-actions">
        {streaming ? (
          <>
            <Button variant="danger" onClick={stopCamera}>Stop</Button>
            <Button onClick={capture} aria-label="Capture document">
              <span className="capture-dot" aria-hidden /> Capture
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startCamera}>Start Camera</Button>
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Import Image
            </Button>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileSelected}
          hidden
        />
      </div>

      <p className="camera-hint">
        For now, importing an image creates a document so you can test the gallery & detail flow.
      </p>
    </div>
  )
}

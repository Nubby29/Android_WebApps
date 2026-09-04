import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { createDocument } from '../models/document-model/index.js'

const DocumentContext = createContext(null)

const seed = [
  createDocument({ id: 'd-1', title: 'Electric Bill — Aug 2026', labels: ['invoice', 'utility'] }),
  createDocument({ id: 'd-2', title: 'Driver License', labels: ['id', 'personal'] }),
  createDocument({ id: 'd-3', title: 'Lease Agreement', labels: ['contract', 'housing'] }),
  createDocument({ id: 'd-4', title: 'Grocery Receipt', labels: ['receipt'] })
]

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState(seed)

  const addDocument = useCallback((partial = {}) => {
    const doc = createDocument(partial)
    setDocuments(prev => [doc, ...prev])
    return doc
  }, [])

  const updateDocument = useCallback((id, patch) => {
    setDocuments(prev =>
      prev.map(d => (d.id === id ? { ...d, ...patch, updatedAt: Date.now() } : d))
    )
  }, [])

  const removeDocument = useCallback((id) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
  }, [])

  const value = useMemo(
    () => ({ documents, addDocument, updateDocument, removeDocument }),
    [documents, addDocument, updateDocument, removeDocument]
  )

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>
}

export function useDocuments() {
  const ctx = useContext(DocumentContext)
  if (!ctx) throw new Error('useDocuments must be used within DocumentProvider')
  return ctx
}

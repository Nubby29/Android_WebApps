// Document domain model.

export function createDocument({ id, title = 'Untitled', labels = [] } = {}) {
  const now = Date.now()
  return {
    id: id ?? crypto.randomUUID(),
    title,
    labels,
    createdAt: now,
    updatedAt: now,
    thumbnailId: null,
    fullImageId: null,
    ocrText: '',
    classification: null
  }
}

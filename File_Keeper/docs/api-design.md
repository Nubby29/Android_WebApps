# API Design

File Keeper is primarily client-only. The following internal service contracts are exposed via the `src/services/` modules.

## StorageService
```ts
interface StorageService {
  putDocument(doc: Document): Promise<string>;        // returns id
  getDocument(id: string): Promise<Document | null>;
  listDocuments(filter?: DocumentFilter): Promise<Document[]>;
  deleteDocument(id: string): Promise<void>;
  putBlob(id: string, blob: Blob): Promise<void>;
  getBlob(id: string): Promise<Blob | null>;
}
```

## DatabaseService
```ts
interface DatabaseService {
  init(): Promise<void>;
  putMeta(record: MetadataRecord): Promise<void>;
  getMeta(id: string): Promise<MetadataRecord | null>;
  query(q: SearchQuery): Promise<MetadataRecord[]>;
}
```

## MlService
```ts
interface MlService {
  classify(image: Blob): Promise<ClassificationResult>;
  extractText(image: Blob): Promise<OcrResult>;
}
```

## Document model
```ts
interface Document {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  labels: string[];
  thumbnailId: string;
  fullImageId: string;
  ocrText?: string;
  classification?: { type: string; confidence: number };
}
```

## Cloud (optional)
When `VITE_API_BASE_URL` is set, services may proxy to a cloud backend. Auth uses bearer tokens from secure storage.

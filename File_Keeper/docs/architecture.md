# Architecture

## Overview
File Keeper is a Progressive Web App (PWA) targeting Android browsers. It follows a client-only architecture with optional cloud backends for OCR/ML services.

## Layers
- **Views** (`src/views/`): Route-level pages. Each view is self-contained.
- **Components** (`src/components/`): Reusable UI building blocks (camera, gallery, document-processor, labeler).
- **Services** (`src/services/`): Cross-cutting concerns — storage, ML, database wrappers.
- **Models** (`src/models/`): Domain entities (Document, Label, User).
- **Utils** (`src/utils/`): Pure helpers (image processing, formatters).

## Data flow
1. Camera view captures image → DocumentProcessor (edge detection, perspective correction)
2. Processed image → OCR service extracts text
3. ML Labeler classifies document type and generates labels
4. Storage service persists image blob + metadata
5. Database service indexes metadata for search

## Tech
- React 18 + Vite + React Router
- vite-plugin-pwa for install/offline support
- IndexedDB (via idb) for local persistence
- Tesseract.js or ML Kit for OCR
- TensorFlow Lite / on-device model for classification

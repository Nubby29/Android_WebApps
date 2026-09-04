# File Keeper - Document Management Android WebApp

## 📋 Project Overview
File Keeper is an Android WebApp designed to help users capture, organize, and manage important documents with intelligent automatic labeling. The application uses advanced camera scanning technology inspired by CamScanner to detect and process document images, then automatically categorizes them based on content understanding.

---

## 🎯 Project Goals

### Primary Goals
- - Build a functional Android WebApp for document scanning and management
- - Implement automatic document detection and edge correction
- - Enable auto-labeling of documents based on image recognition
- - Provide secure storage for important documents
- - Create an intuitive and user-friendly interface

### Secondary Goals
- - Support multiple document formats
- - Implement document search and filtering capabilities
- - Enable document sharing and export options
- - Optimize performance for various Android devices
- - Ensure data privacy and security

---

## 📦 Technical Requirements

### Frontend (UI/UX)
- - Responsive Android WebApp interface
- - Camera/image capture module
- - Document gallery/list view
- - Document detail view with labels
- - Search and filter functionality
- - Settings and preferences page

### Backend & Core Features
- - Document image processing and enhancement
- - Edge detection algorithm implementation
- - Perspective correction algorithm
- - Image-to-document conversion (cropping, alignment)
- - OCR (Optical Character Recognition) integration
- - Document classification/labeling engine
- - Storage management system

### AI/ML & Image Processing
- - Document type classification model (invoice, receipt, contract, ID, etc.)
- - Text extraction and analysis
- - Document content understanding
- - Automatic label generation based on content

### Database & Storage
- - Local database for metadata (SQLite or similar)
- - File storage for document images
- - Metadata storage (labels, dates, categories)
- - User preferences storage

### Dependencies & Libraries
- - Camera library (native camera or third-party)
- - Image processing library (OpenCV or similar)
- - OCR library (Tesseract, Google ML Kit, or similar)
- - ML/Classification library (TensorFlow Lite, ML Kit)
- - Database ORM (Room, Realm, or SQLite wrapper)
- - HTTP client for API calls (if using cloud services)
- - UI framework (React Native, Flutter, or vanilla Android)

---

## 🏗️ Project Structure

```
File_Keeper/
├── README.md (this file)
├── docs/
│   ├── architecture.md
│   ├── design-specs.md
│   └── api-design.md
├── src/
│   ├── components/
│   │   ├── camera/
│   │   ├── document-processor/
│   │   ├── labeler/
│   │   └── gallery/
│   ├── services/
│   │   ├── storage-service/
│   │   ├── ml-service/
│   │   └── database-service/
│   ├── models/
│   │   └── document-model/
│   ├── utils/
│   │   ├── image-processing/
│   │   └── helpers/
│   └── views/
│       ├── main-view/
│       ├── camera-view/
│       ├── document-detail/
│       └── settings-view/
├── tests/
│   ├── unit-tests/
│   ├── integration-tests/
│   └── e2e-tests/
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
├── config/
│   ├── app-config.json
│   └── build-config/
├── package.json (or equivalent)
├── .env.example
├── .gitignore
└── LICENSE
```

---

## 📝 Development Checklist

### Phase 1: Project Setup
- - Initialize project repository and structure
- - Set up development environment
- - Configure build tools and dependencies
- - Create basic project documentation
- - Set up version control and CI/CD pipeline

### Phase 2: Core UI Components
- - Build main navigation/dashboard
- - Implement camera interface layout
- - Create document gallery view
- - Design document detail page
- - Build settings/preferences page

### Phase 3: Camera & Document Capture
- - Integrate camera functionality
- - Implement document edge detection
- - Add perspective correction
- - Create document preview interface
- - Add image enhancement controls

### Phase 4: Image Processing
- - Implement edge detection algorithm
- - Build perspective correction system
- - Create image cropping and alignment
- - Add image enhancement filters
- - Optimize performance

### Phase 5: OCR & Text Extraction
- - Integrate OCR library
- - Extract text from document images
- - Implement text cleaning and normalization
- - Add text preview functionality
- - Handle multi-language support (optional)

### Phase 6: AI/ML Labeling System
- - Train/integrate document classification model
- - Implement automatic label generation
- - Add confidence scoring
- - Create label suggestion interface
- - Allow user to confirm/edit labels

### Phase 7: Storage & Database
- - Set up local database
- - Implement document metadata storage
- - Create file storage system
- - Add document indexing
- - Implement data backup mechanism

### Phase 8: Search & Organization
- - Implement search functionality
- - Create filtering options
- - Build sorting capabilities
- - Add tagging system
- - Create document collections/folders

### Phase 9: Testing & Quality Assurance
- - Write unit tests
- - Perform integration testing
- - Conduct end-to-end testing
- - Security testing
- - Performance optimization

### Phase 10: Deployment & Release
- - Prepare release build
- - Create deployment documentation
- - Set up app store distribution
- - Create user documentation
- - Plan post-launch support

---

## 🛠️ Technology Stack (Proposed)

### Frontend
- - Framework: React Native / Flutter / Vanilla Android
- - UI Components: Material Design / Custom Components
- - State Management: Redux / Provider / Bloc

### Backend/Processing
- - Image Processing: OpenCV / PIL / Python imaging libraries
- - OCR: Google ML Kit / Tesseract / AWS Textract
- - ML Classification: TensorFlow Lite / ML Kit / Custom Model

### Database
- - Local: SQLite / Room Database
- - Optional Cloud: Firebase / AWS DynamoDB

### Development Tools
- - Version Control: Git
- - Package Manager: npm / yarn / pip
- - Build Tools: Gradle / Xcode / Maven
- - Testing: Jest / JUnit / Pytest
- - CI/CD: GitHub Actions / Jenkins

---

## 📚 Resources & References

### Inspiration & Reference
- - [CamScanner - INTSIG PTE](https://www.camscanner.com/)
- - OpenCV Documentation
- - Google ML Kit Documentation
- - Android Camera Documentation

### Learning Resources
- - [OpenCV Tutorials](https://docs.opencv.org/master/d9/df8/tutorial_root.html)
- - [Google ML Kit Guide](https://developers.google.com/ml-kit)
- - [Android Camera Guide](https://developer.android.com/guide/topics/media/camera)
- - [TensorFlow Lite Guide](https://www.tensorflow.org/lite)

---

## 📞 Getting Started

### Prerequisites
- - Node.js 20+
- - Git
- - (For APK build) JDK 17, Android SDK, [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)

### Run as PWA (web)
```bash
git clone https://github.com/Nubby29/Android_WebApps.git
cd Android_WebApps/File_Keeper
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs ./dist
```

### Deploy the PWA
Pushes to `main` automatically deploy to GitHub Pages via `.github/workflows/deploy-pwa.yml`.

Live URL: `https://nubby29.github.io/Android_WebApps/File_Keeper/`

### Build an installable Android APK (TWA)

The deployed PWA is wrapped into a real Android app using [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) (Trusted Web Activity).

1. **Install Bubblewrap**
   ```bash
   npm i -g @bubblewrap/cli
   ```
2. **Generate a signing key** (skip if you already have one)
   ```bash
   keytool -genkey -v -keystore android.keystore -alias android \
     -keyalg RSA -keysize 2048 -validity 10000
   ```
3. **Initialize the project** (uses the committed `twa-manifest.json`)
   ```bash
   bubblewrap init --manifest=https://nubby29.github.io/Android_WebApps/File_Keeper/manifest.webmanifest
   ```
   Bubblewrap will print the SHA-256 fingerprint of your signing key. Copy it.
4. **Update the Digital Asset Links file** with that fingerprint:
   `File_Keeper/public/.well-known/assetlinks.json` — replace
   `REPLACE_WITH_SHA256_OF_YOUR_ANDROID_SIGNING_KEY` with the fingerprint.
   Commit and push so it deploys.
5. **Build the APK**
   ```bash
   bubblewrap build
   # -> app-release-signed.apk in the project root
   ```
6. **Install on your phone**
   ```bash
   adb install app-release-signed.apk
   ```
   Or transfer the APK to the phone and tap to install (enable "Install unknown apps" for your file manager).

### Notes
- TWA verification requires the assetlinks file to be served at the **site root**: `https://nubby29.github.io/Android_WebApps/.well-known/assetlinks.json`. The post-build script copies it there automatically.
- For Play Store distribution, run `bubblewrap build --mode=release` and upload the resulting AAB.

---

## 🔐 Privacy & Security Considerations

- - Local storage of sensitive documents
- - Encryption of stored data
- - Secure camera permissions
- - User data privacy compliance (GDPR, etc.)
- - Secure deletion of old documents
- - Optional biometric authentication

---

## 📄 License

[To be determined]

---

## 👨‍💻 Contributors

- Nubby29

---

## 📝 Notes & Updates

- Project initiated: 2026-09-04
- Current Phase: Phase 2 - Core UI Components
- Last Updated: 2026-09-04
- Deployed PWA: https://nubby29.github.io/Android_WebApps/File_Keeper/

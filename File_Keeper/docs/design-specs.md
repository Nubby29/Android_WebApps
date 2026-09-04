# Design Specifications

## Visual language
- Dark-first palette (matches GitHub dark) for OLED-friendly viewing.
- Accent color: `#1f6feb` (blue).
- Border radius: 10–12px on cards, 8px on buttons.
- Spacing scale: 4 / 8 / 12 / 16 / 20 / 24.

## Typography
- System font stack for performance and native feel.
- Heading scale: 1.5 / 1.25 / 1.05 rem.
- Body: 1rem (16px).

## Layout
- Mobile-first single-column layout, max-width 720px on tablets/desktop.
- Sticky header, fixed bottom navigation (Home / Scan / Gallery / Settings).
- Safe-area padding for notched devices.

## Components
- `AppShell` — header, main, bottom nav.
- `DocumentCard` — thumbnail, title, labels, date.
- `LabelChip` — pill-style label.
- `CameraPreview` — live video stream + capture controls.
- `EmptyState` — friendly placeholder.

## Accessibility
- All interactive elements ≥ 44×44 px touch target.
- `aria-label` on icon-only buttons.
- Respect `prefers-reduced-motion`.

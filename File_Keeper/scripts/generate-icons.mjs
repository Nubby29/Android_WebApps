// One-off script to generate PWA icons from public/favicon.svg.
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

const svg = await readFile(resolve(publicDir, 'favicon.svg'))

async function makePng(size, filename) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 31, g: 111, b: 235, alpha: 1 } })
    .png()
    .toBuffer()
  await writeFile(resolve(publicDir, filename), buf)
  console.log(`wrote ${filename} (${size}x${size})`)
}

await makePng(192, 'pwa-192x192.png')
await makePng(512, 'pwa-512x512.png')
await makePng(512, 'pwa-512x512-maskable.png')

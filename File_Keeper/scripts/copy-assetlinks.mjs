#!/usr/bin/env node
// Post-build step: copy .well-known/assetlinks.json to dist root so it's
// served at https://<host>/.well-known/assetlinks.json (required for TWA).
import { copyFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const src = resolve(root, 'public', '.well-known', 'assetlinks.json')
const dest = resolve(root, 'dist', '.well-known', 'assetlinks.json')

await mkdir(dirname(dest), { recursive: true })
await copyFile(src, dest)
console.log(`copied assetlinks.json -> ${dest}`)

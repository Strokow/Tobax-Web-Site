// Media optimization for the Tobax site.
// Generates AVIF + WebP + a compressed fallback for the images actually used,
// resized to their real display sizes. Run: npm run optimize:media
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'src', 'assets')
const outDir = join(srcDir, 'optimized')
mkdirSync(outDir, { recursive: true })

// Each job: source, output basename, target width (and optional square crop).
const jobs = [
  // Player cover — displayed at 48x48 (up to ~3x DPR). 192px square is plenty.
  { input: 'heidelore.jpg', out: 'heidelore-cover', width: 192, height: 192, fit: 'cover' },
  // Bio image — container maxes ~700px; 1400px covers retina.
  { input: 'bild4.jpg', out: 'bild4', width: 1400 },
  // Full-bleed background — grayscale-filtered anyway; 2000px is enough.
  { input: 'bild2.jpg', out: 'bild2-bg', width: 2000 },
]

const kb = (n) => `${(n / 1024).toFixed(1)} KB`

for (const job of jobs) {
  const base = sharp(join(srcDir, job.input)).resize({
    width: job.width,
    height: job.height,
    fit: job.fit || 'inside',
    withoutEnlargement: true,
  })

  const outputs = [
    { ext: 'avif', opts: { quality: 50, effort: 4 } },
    { ext: 'webp', opts: { quality: 72 } },
    { ext: 'jpg', opts: { quality: 78, mozjpeg: true } },
  ]

  for (const { ext, opts } of outputs) {
    const outPath = join(outDir, `${job.out}.${ext}`)
    const info =
      ext === 'avif' ? await base.clone().avif(opts).toFile(outPath)
      : ext === 'webp' ? await base.clone().webp(opts).toFile(outPath)
      : await base.clone().jpeg(opts).toFile(outPath)
    console.log(`  ${job.out}.${ext.padEnd(4)} ${kb(info.size).padStart(10)}  (${info.width}x${info.height})`)
  }
}

// Open Graph / social share image (1200x630) into public/ for a stable URL:
// https://tobax.online/og-image.jpg  (referenced by og:image / twitter:image)
const ogInfo = await sharp(join(srcDir, 'bild4.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(root, 'public', 'og-image.jpg'))
console.log(`  og-image.jpg ${kb(ogInfo.size).padStart(10)}  (1200x630) -> public/`)

console.log('\nDone -> src/assets/optimized/ + public/og-image.jpg')

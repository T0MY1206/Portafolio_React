/**
 * Lista todos los archivos de imagen en public/assets/bocato
 * y escribe src/data/bocato-images.json para que la app los use sin hardcodear nombres.
 * Se ejecuta antes de dev/build (npm run dev / npm run build).
 */
const fs = require('fs')
const path = require('path')

const IMG_EXT = /\.(jpg|jpeg|png|webp|gif)$/i
const SOURCE_DIR = path.join(process.cwd(), 'public', 'assets', 'bocato')
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'bocato-images.json')

let names = []
try {
  if (fs.existsSync(SOURCE_DIR)) {
    names = fs.readdirSync(SOURCE_DIR)
      .filter((name) => IMG_EXT.test(name))
      .sort()
  }
} catch (_) {
  names = []
}

const dataDir = path.dirname(OUT_FILE)
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(names, null, 2), 'utf8')

/**
 * Servidor mínimo para registrar visitas en un archivo de texto.
 * Ejecutar con: node server.js
 * El frontend envía POST /api/visit con datos del navegador.
 */
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.VISITS_PORT || 3001
const LOG_FILE = path.join(__dirname, 'visits.log')

const app = express()
app.use(express.json())

// CORS para que el frontend (otro puerto en dev) pueda enviar
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.post('/api/visit', (req, res) => {
  try {
    const {
      userAgent = '',
      language = '',
      languages = '',
      timestamp = new Date().toISOString(),
      url = '',
      referrer = '',
      screenWidth,
      screenHeight,
      timezone,
      platform
    } = req.body

    const line = [
      timestamp,
      `url=${url}`,
      `referrer=${referrer || '(directo)'}`,
      `userAgent=${userAgent}`,
      `language=${language}`,
      `languages=${languages}`,
      `platform=${platform || ''}`,
      `screen=${screenWidth ?? ''}x${screenHeight ?? ''}`,
      `timezone=${timezone || ''}`
    ].join(' | ') + '\n'

    fs.appendFileSync(LOG_FILE, line)
    res.status(204).end()
  } catch (err) {
    console.error('Error guardando visita:', err)
    res.status(500).json({ error: 'Error al registrar la visita' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor de visitas escuchando en http://localhost:${PORT}`)
  console.log(`Registrando en: ${LOG_FILE}`)
})

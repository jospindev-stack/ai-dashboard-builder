import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import dashboardRouter from './routes/dashboard.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/dashboard', dashboardRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'AI Dashboard Builder', model: process.env.GROQ_MODEL })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health\n`)
})

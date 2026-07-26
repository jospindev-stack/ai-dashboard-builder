import { Router } from 'express'
import { generateDashboard, refineDashboard } from '../services/groqService.js'

const router = Router()

router.post('/generate', async (req, res) => {
  const { description } = req.body

  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    return res.status(400).json({ error: 'Description must be at least 5 characters.' })
  }
  if (description.length > 1000) {
    return res.status(400).json({ error: 'Description must be under 1000 characters.' })
  }

  try {
    const dashboard = await generateDashboard(description.trim())
    res.json({ dashboard })
  } catch (err) {
    console.error('[generate]', err.message)
    res.status(500).json({ error: 'Dashboard generation failed. Please try again.' })
  }
})

router.post('/refine', async (req, res) => {
  const { currentConfig, instruction } = req.body

  if (!currentConfig || !instruction) {
    return res.status(400).json({ error: 'currentConfig and instruction are required.' })
  }

  try {
    const dashboard = await refineDashboard(currentConfig, instruction)
    res.json({ dashboard })
  } catch (err) {
    console.error('[refine]', err.message)
    res.status(500).json({ error: 'Refinement failed. Please try again.' })
  }
})

export default router

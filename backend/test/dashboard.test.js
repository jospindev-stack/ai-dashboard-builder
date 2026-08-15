import test from 'node:test'
import assert from 'node:assert/strict'
import { createDashboardRouter } from '../src/routes/dashboard.js'

function getHandler(router, path) {
  const layer = router.stack.find(
    (entry) => entry.route?.path === path && entry.route?.methods?.post
  )
  return layer.route.stack[0].handle
}

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

test('generate rejects descriptions shorter than five characters', async () => {
  const router = createDashboardRouter()
  const handler = getHandler(router, '/generate')
  const res = createResponse()

  await handler({ body: { description: 'abc' } }, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { error: 'Description must be at least 5 characters.' })
})

test('generate rejects descriptions longer than 1000 characters', async () => {
  const router = createDashboardRouter()
  const handler = getHandler(router, '/generate')
  const res = createResponse()

  await handler({ body: { description: 'a'.repeat(1001) } }, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { error: 'Description must be under 1000 characters.' })
})

test('generate trims input and returns generated dashboard', async () => {
  let received
  const dashboard = { title: 'Sales Dashboard', kpis: [], charts: [] }
  const router = createDashboardRouter({
    generateDashboard: async (description) => {
      received = description
      return dashboard
    },
  })
  const handler = getHandler(router, '/generate')
  const res = createResponse()

  await handler({ body: { description: '  Sales dashboard  ' } }, res)

  assert.equal(received, 'Sales dashboard')
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { dashboard })
})

test('generate hides provider failures behind a generic error', async () => {
  const router = createDashboardRouter({
    generateDashboard: async () => {
      throw new Error('provider secret details')
    },
  })
  const handler = getHandler(router, '/generate')
  const res = createResponse()

  await handler({ body: { description: 'Sales dashboard' } }, res)

  assert.equal(res.statusCode, 500)
  assert.deepEqual(res.body, { error: 'Dashboard generation failed. Please try again.' })
})

test('refine rejects missing configuration or instruction', async () => {
  const router = createDashboardRouter()
  const handler = getHandler(router, '/refine')
  const res = createResponse()

  await handler({ body: { currentConfig: {} } }, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, { error: 'currentConfig and instruction are required.' })
})

test('refine returns the updated dashboard', async () => {
  const currentConfig = { title: 'Original' }
  const updated = { title: 'Updated' }
  let receivedConfig
  let receivedInstruction
  const router = createDashboardRouter({
    refineDashboard: async (config, instruction) => {
      receivedConfig = config
      receivedInstruction = instruction
      return updated
    },
  })
  const handler = getHandler(router, '/refine')
  const res = createResponse()

  await handler(
    { body: { currentConfig, instruction: 'Use a green theme' } },
    res
  )

  assert.deepEqual(receivedConfig, currentConfig)
  assert.equal(receivedInstruction, 'Use a green theme')
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { dashboard: updated })
})

test('refine hides provider failures behind a generic error', async () => {
  const router = createDashboardRouter({
    refineDashboard: async () => {
      throw new Error('provider secret details')
    },
  })
  const handler = getHandler(router, '/refine')
  const res = createResponse()

  await handler(
    { body: { currentConfig: { title: 'Original' }, instruction: 'Change theme' } },
    res
  )

  assert.equal(res.statusCode, 500)
  assert.deepEqual(res.body, { error: 'Refinement failed. Please try again.' })
})

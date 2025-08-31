import { Hono } from 'hono'

const app = new Hono()

// Most basic test
app.get('/test', (c) => c.text('Basic route works'))

// Dynamic route test
app.get('/test/:param', (c) => {
  const param = c.req.param('param')
  return c.text(`Dynamic route works! Param: ${param}`)
})

export default app
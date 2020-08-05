import express from 'express'

const morgan = require('morgan')

import { router } from './routes'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(router)

export { app }

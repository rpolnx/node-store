import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

const morgan = require('morgan')

import { router } from './routes'
import { handleError } from './config/error.handler'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(router)

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    await res.status(err.status || 500)
    res.status(500).json({ status: 500, message: 'internal error', type: 'internal' })
})

export { app }

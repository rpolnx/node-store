import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

const morgan = require('morgan')

import { router } from './routes'
import { NotFound, ErrorHandler } from './common/exceptions/error.handler'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message, type: 'treated' })
    }

    if(err instanceof Error) {
        return res.status(500).json({ status: 500, message: err.message, type: 'unexpected' })
    }

    return res.status(500).json({ status: 500, generic: err })
})

export { app }

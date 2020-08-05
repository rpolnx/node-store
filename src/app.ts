import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

const morgan = require('morgan')

import { router } from './routes'
import { ErrorHandler } from './common/exceptions/error.handler'
import { ValidationError } from 'class-validator'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message, type: 'treated' })
    }

    if (err instanceof Error) {
        return res.status(500).json({ status: 500, message: err.message, type: 'unexpected' })
    }

    if (err instanceof Array && err.every((item) => item instanceof ValidationError)) {
        return res.status(400).json({ status: 400, message: err, type: 'treated' })
    }

    return res.status(500).json({ status: 500, generic: err })
})

export { app }

import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'class-validator'

class ErrorHandler extends Error {
    public statusCode: number

    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

class NotFound extends ErrorHandler {
    constructor(message: string) {
        super(404, message)
    }
}

const globalErrorHandler = (err: any, _: Request, res: Response) => {
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
}

export { ErrorHandler, NotFound, globalErrorHandler }

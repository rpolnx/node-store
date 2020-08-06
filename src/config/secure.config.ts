import { Request, Response, NextFunction } from 'express'
import { Unauthorized } from '../common/exceptions/error.handler'

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res
            .status(401)
            .json({ auth: false, status: 401, message: 'Authorization header is missing', type: 'treated' })
    }

    if (!authorization.includes('Bearer ')) {
        return res
            .status(401)
            .json({ auth: false, status: 401, message: 'Authorization must be a Bearer token', type: 'treated' })
    }

    const token = authorization.replace('Bearer ', '')

    try {
        jwt.verify(token, secret)
    } catch (ex) {
        throw new Unauthorized('JWT Error', ex)
    }
    next()
}

export { authMiddleware }

import { Router } from 'express'

const authRouter = Router()

var jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

authRouter.post('/', (req, res, next) => {
    const user: string = process.env.ADMIN_APPLICATION_USERNAME
    const pass: string = process.env.ADMIN_APPLICATION_PASSWORD

    if (req.body.user === user && req.body.password === pass) {
        const token = jwt.sign({ user }, secret, { expiresIn: 300 })
        return res.status(200).send({ auth: true, token: token, expiresIn: 300 })
    }

    return res.status(401).json({ status: 401, cause: 'username or password wrong' })
})

export { authRouter }

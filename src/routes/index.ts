import { Router } from 'express'

import { productRouter } from './product.routes'
import { authRouter } from './auth.router'
import { authMiddleware } from '../config/secure.config'

const router = Router()

router.use('/products', authMiddleware, productRouter)
router.use('/authenticate', authRouter)

export { router }

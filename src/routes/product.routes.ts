import { Router } from 'express'
import { productController } from '../product'

const productRouter = Router()

productRouter.get('/', async (req, res, next) => {
    await productController.getAllPaginated(req, res)
    .catch(next)
})
productRouter.get('/:id', async (req, res, next) => {
    await productController.get(req, res)
    .catch(next)
})
productRouter.post('/', async (req, res, next) => {
    await productController.create(req, res)
    .catch(next)
})
productRouter.put('/:id', async (req, res, next) => {
    await productController.update(req, res)
    .catch(next)
})
productRouter.delete('/:id', async (req, res, next) => {
    await productController.delete(req, res)
    .catch(next)
})

export { productRouter }

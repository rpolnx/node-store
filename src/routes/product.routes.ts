import { Router } from 'express'
import { productController } from '../product'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    return await productController.getAllPaginated(req, res)
})
productRouter.get('/:id', async (req, res) => {
    return await productController.get(req, res)
})
productRouter.post('/', async (req, res) => {
    return await productController.create(req, res)
})
productRouter.put('/:id', async (req, res) => {
    return await productController.update(req, res)
})
productRouter.delete('/:id', async (req, res) => {
    return await productController.delete(req, res)
})

export { productRouter }

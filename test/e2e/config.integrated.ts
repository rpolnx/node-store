import express, { Router } from 'express'

import { mockReset, mockDeep } from 'jest-mock-extended'
import { globalErrorHandler } from '../../src/common/exceptions/error.handler'
import { IPaginateRepository } from '../../src/common/repository.interface'
import { IProductService } from '../../src/product/service/product.service.interface'
import { ProductController } from '../../src/product/controller/product.controller'
import { Product } from '../../src/product/dto/product'
import { ProductService } from '../../src/product/service/product.service'

const mockedRepository = mockDeep<IPaginateRepository<Product>>()
const productService: IProductService = new ProductService(mockedRepository)
const productController: ProductController = new ProductController(productService)

const generateApp = () => {
    const app = express()

    const router = Router()

    const productRouter = generateProductRouter()
    router.use('/products', productRouter)

    app.use(express.json())
    app.use(router)

    app.use(globalErrorHandler)

    return app
}

const generateProductRouter = () => {
    const productRouter = Router()

    productRouter.get('/', async (req, res, next) => {
        await productController.getAllPaginated(req, res).catch(next)
    })
    productRouter.get('/:id', async (req, res, next) => {
        await productController.get(req, res).catch(next)
    })
    productRouter.post('/', async (req, res, next) => {
        await productController.create(req, res).catch(next)
    })
    productRouter.put('/:id', async (req, res, next) => {
        await productController.update(req, res).catch(next)
    })
    productRouter.delete('/:id', async (req, res, next) => {
        await productController.delete(req, res).catch(next)
    })

    return productRouter
}

export { generateApp, mockedRepository, productService, productController }

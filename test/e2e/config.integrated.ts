import express, { Router } from 'express'
import { mockDeep } from 'jest-mock-extended'
import { globalErrorHandler } from '../../src/common/exceptions/error.handler'
import { IPaginateRepository } from '../../src/common/repository.interface'
import { Product } from '../../src/product/dto/product'
import { productService as basicProductService } from '../../src/product/index'
import { IProductService } from '../../src/product/service/product.service.interface'
import { productRouter } from '../../src/routes/product.routes'

const mockedRepository = mockDeep<IPaginateRepository<Product>>()
basicProductService.setRepository(mockedRepository)
const productService: IProductService = basicProductService

const generateApp = () => {
    const app = express()

    const router = Router()
    router.use('/products', productRouter)

    app.use(express.json())
    app.use(router)

    app.use(globalErrorHandler)

    return app
}

export { generateApp, mockedRepository, productService }


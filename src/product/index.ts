import { IPaginateRepository } from '../common/repository.interface'
import { Product } from './dto/product'
import { ProductRepository } from './repository/product.repository'
import { IProductService } from './service/product.service.interface'
import { ProductService } from './service/product.service'
import { ProductController } from './controller/product.controller'

const productRepository: IPaginateRepository<Product> = new ProductRepository()
const productService: IProductService = new ProductService(productRepository)

const productController: ProductController = new ProductController(productService)

export { productService, productController }

import { IPaginateRepository } from '../../common/repository.interface'
import { Product } from '../dto/product'
import { IProductService } from './product.service.interface'
import { SimpleId } from '../../common/simpleId.common'
import { NotFound, ErrorHandler } from '../../common/exceptions/error.handler'

export class ProductService implements IProductService {
    constructor(private repository: IPaginateRepository<Product>) {}

    async getAllPaginated(page: number): Promise<Product[]> {
        return await this.repository.getAll(page)
    }
    async getById(id: string): Promise<Product> {
        const product: Product = await this.repository.getById(id)

        if (!product) {
            throw new NotFound('Product not found')
        }

        return product
    }

    async create(object: Product): Promise<SimpleId> {
        const product: Product = await this.repository.create(object)

        if (!product) {
            throw new Error('Error creating product')
        }

        return new SimpleId(product.id)
    }

    async update(id: string, object: Product): Promise<void> {
        const updated = await this.repository.update(id, object)
        if (!updated) {
            throw new NotFound('Product not found')
        }
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}

import { IPaginateRepository } from '../../common/repository.interface'
import { Product } from '../dto/product'
import { IProductService } from './product.service.interface'
import { SimpleId } from '../../common/simpleId.common'

export class ProductService implements IProductService {
    constructor(private repository: IPaginateRepository<Product>) {}

    async getAllPaginated(page: number): Promise<Product[]> {
        try {
            return this.repository.getAll(page)
        } catch (e) {
            console.log(`Error getting products: ${e}`)
            throw new Error('Method not implemented.')
        }
    }
    async getById(id: string): Promise<Product> {
        try {
            const product: Product = await this.repository.getById(id)

            if (!product) {
                throw new Error('Product not found')
            }

            return product
        } catch (e) {
            console.log(`Error getting product: ${e}`)
            throw new Error('Method not implemented.')
        }
    }

    async create(object: Product): Promise<SimpleId> {
        try {
            const product: Product = await this.repository.create(object)

            if (!product) {
                throw new Error('Product not found')
            }

            return new SimpleId(product.id)
        } catch (e) {
            console.log(`Error creating product: ${e}`)
        }
    }

    async update(id: string, object: Product): Promise<void> {
        try {
            const updated = await this.repository.update(id, object)
            if(!updated) {
                throw new Error('Product not found')
            }
            
        } catch (e) {
            console.log(`Error updating product: ${e}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.repository.delete(id)
        } catch (e) {
            console.log(`Error deleting product: ${e}`)
        }
    }
}

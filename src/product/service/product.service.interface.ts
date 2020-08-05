import { Product } from '../dto/product'
import { SimpleId } from '../../common/simpleId.common'

export interface IProductService {
    getAllPaginated(page: number): Promise<Product[]>

    getById(id: string): Promise<Product>

    create(object: Product): Promise<SimpleId>

    update(id: string, object: Product): Promise<void>

    delete(id: string): Promise<void>
}

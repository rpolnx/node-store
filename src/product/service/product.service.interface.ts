import { Product } from '../dto/product'
import { SimpleId } from '../../common/simpleId.common'
import { IPaginateRepository } from 'src/common/repository.interface'

export interface IProductService {
    getAllPaginated(page: number): Promise<Product[]>

    getById(id: string): Promise<Product>

    create(object: Product): Promise<SimpleId>

    update(id: string, object: Product): Promise<void>

    delete(id: string): Promise<void>

    setRepository(repository: IPaginateRepository<Product>): void;
}

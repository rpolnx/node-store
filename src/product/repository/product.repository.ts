import { IPaginateRepository } from '../../common/repository.interface'
import { Product } from '../dto/product'
import { productSchema, ProductSchema } from '../schema/product.entity'
import ValidationError, { model } from 'mongoose'

export class ProductRepository implements IPaginateRepository<Product> {
    private limitPerPage: number = 10

    async getAll(page: number): Promise<Product[]> {
        const modelList = await productSchema
            .find({})
            .skip(page * this.limitPerPage)
            .limit(this.limitPerPage)

        const products: Product[] = modelList
            .map((it) => it.toObject())
            .map((resp) => {
                return new Product({ ...resp }, resp._id)
            })

        return products
    }

    async getById(id: string): Promise<Product> {
        const product = await productSchema.findOne({ _id: id })

        if(!product) {
              return null;  
        }

        const resp = product.toObject()
        return { ...resp, id: resp._id }
    }

    async create(product: Product): Promise<Product> {
        const created = await productSchema.create({ ...product, _id: product.id })
        const resp = created.toObject()
        return { ...resp, id: resp._id.toString() }
    }

    async update(id: string, product: Product): Promise<Product> {
        const created = await productSchema.updateOne({ _id: id }, { ...product, _id: product.id })
        const resp = created.toObject()
        return { ...resp, id: resp._id.toString() }
    }

    async delete(id: string): Promise<void> {
        await productSchema.deleteOne({ _id: id })
    }
}

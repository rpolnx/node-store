import { Request, Response } from 'express'
import { Product } from '../dto/product'
import { IProductService } from '../service/product.service.interface'
import { SimpleId } from '../../common/simpleId.common'

export class ProductController {
    constructor(private productService: IProductService) {}

    async getAllPaginated(req: Request, res: Response): Promise<Response<Product[]>> {
        const page: number = req.query.page ? Number(req.query.page) : 0

        const products: Product[] = await this.productService.getAllPaginated(page)

        return res.status(200).json(products)
    }

    async get(req: Request, res: Response): Promise<Response<Product>> {
        const id: string = req.params.id
        const product: Product = await this.productService.getById(id)

        return res.status(200).json(product)
    }

    async create(req: Request, res: Response): Promise<Response<SimpleId>> {
        const product: Product = new Product(req.body)
        const created: SimpleId = await this.productService.create(product)

        return res.status(201).json(created)
    }

    async update(req: Request, res: Response): Promise<Response<SimpleId>> {
        const id: string = req.params.id
        const product: Product = req.body
        await this.productService.update(id, product)

        return res.status(204).json()
    }

    async delete(req: Request, res: Response): Promise<Response<Product>> {
        const id: string = req.params.id
        await this.productService.delete(id)

        return res.status(204).json()
    }
}

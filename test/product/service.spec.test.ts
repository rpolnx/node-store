import { IProductService } from '../../src/product/service/product.service.interface'
import { ProductService } from '../../src/product/service/product.service'
import { Product } from '../../src/product/dto/product'

import { mock, mockDeep, anyString, mockReset } from 'jest-mock-extended'
import { IPaginateRepository } from '../../src/common/repository.interface'
import { wrapper } from './mock.utils'

import { NotFound } from '../../src/common/exceptions/error.handler'

import { v4 } from 'uuid'
import { SimpleId } from '../../src/common/simpleId.common'

const repository = mockDeep<IPaginateRepository<Product>>()
const service: IProductService = new ProductService(repository)

describe('Products Service', () => {
    describe('Get all products', () => {
        beforeEach(() => {
            mockReset(repository)
        })

        it('When find any products, then return', async () => {
            const expectedProd: Product[] = Array.of(
                generateProduct('Item 1'),
                generateProduct('Item 2'),
                generateProduct('Item 3')
            )

            repository.getAll.calledWith(0).mockReturnValue(wrapper<Product[]>(expectedProd))

            const actual = await service.getAllPaginated(0)
            expect(actual).toBe(expectedProd)
        })

        it('When there are no products, then return empty list', async () => {
            const empty: Product[] = []

            repository.getAll.calledWith(0).mockReturnValue(wrapper<Product[]>(empty))

            const actual = await service.getAllPaginated(0)
            expect(actual).toBe(empty)
        })
    })

    describe('Get unique product', () => {
        beforeEach(() => {
            mockReset(repository)
        })

        it('When find single products, then return it', async () => {
            const expectedProd: Product = generateProduct('Item 1')

            repository.getById.calledWith(anyString()).mockReturnValue(wrapper<Product>(expectedProd))

            const actual = await service.getById(v4())
            expect(actual).toBe(expectedProd)
        })

        it('When product not found, throw not found exception', async () => {
            repository.getById.calledWith(anyString()).mockReturnValue(null)

            await expect(async () => {
                await service.getById(v4())
            }).rejects.toThrow(NotFound)
        })
    })

    describe('Create product', () => {
        beforeEach(() => {
            mockReset(repository)
        })

        it('When creating a product, returns the id', async () => {
            const initialProd: Product = generateProduct('Item 1')
            const expectedProd: Product = new Product({ ...initialProd })
            expectedProd.id = v4()

            repository.create.calledWith(initialProd).mockReturnValue(wrapper<Product>(expectedProd))

            const actual: SimpleId = await service.create(initialProd)
            const expected: SimpleId = new SimpleId(expectedProd.id)
            expect(actual).toEqual(expected)
        })

        it('When creating product get null object, throw exception', async () => {
            const initialProd: Product = generateProduct('Item 1')

            repository.create.calledWith(initialProd).mockReturnValue(null)

            await expect(async () => {
                await service.getById(v4())
            }).rejects.toThrow(Error)
        })
    })

    describe('Updating product', () => {
        beforeEach(() => {
            mockReset(repository)
        })

        it('When updating an existing product, then return success', async () => {
            const id = v4()
            const initialProd: Product = generateProduct('Item 1')

            repository.update.calledWith(id, initialProd).mockReturnValue(wrapper<boolean>(true))

            await service.update(id, initialProd)

            expect(repository.update).toBeCalledWith(id, initialProd)
        })

        it('When updating a product that does not exists, then throw not found exception', async () => {
            const id = v4()
            const initialProd: Product = generateProduct('Item 1')

            repository.update.calledWith(id, initialProd).mockReturnValue(wrapper<boolean>(false))

            await expect(async () => {
                await service.update(id, initialProd)
            }).rejects.toThrow(NotFound)

            expect(repository.update).toBeCalledWith(id, initialProd)
        })
    })

    describe('Deleting product', () => {
        beforeEach(() => {
            mockReset(repository)
        })

        it('When deleting a product and it get success, return success for idempotent even if not was deleted', async () => {
            const id = v4()

            repository.delete.calledWith(id).mockReturnThis()

            await service.delete(id)

            expect(repository.delete).toBeCalledWith(id)
        })
    })
})

const generateProduct = (name: string) => {
    return new Product({
        name: name,
        description: '',
        price: 20.5,
        category: 'Some category',
        remainingUnits: 10,
        created: new Date(),
    })
}

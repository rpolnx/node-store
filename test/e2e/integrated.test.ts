import { generateApp, mockedRepository } from './config.integrated'
import { Product } from '../../src/product/dto/product'
import { mockReset, anyObject } from 'jest-mock-extended'
import { generateProduct, wrapper } from '../product/mock.utils'

import { v4 } from 'uuid'
import { SimpleId } from '../../src/common/simpleId.common'

const app = generateApp()

const request = require('supertest')(app)

describe('Products integrated test', () => {
    describe('GET /products', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it('When getting all products without passing a page, then find and return all products from first page', async (end) => {
            const expectedProd: Product[] = Array.of(
                generateProduct('Item 1'),
                generateProduct('Item 2'),
                generateProduct('Item 3')
            )
            mockedRepository.getAll.calledWith(0).mockReturnValue(wrapper<Product[]>(expectedProd))

            const response = await request.get('/products').expect(200).expect('Content-Type', /json/)

            const body: Product[] = response.body.map(
                (it: Product) => new Product({ ...it, created: new Date(it.created) }, it.id)
            )

            expect(body).toEqual(expectedProd)

            end()
        })

        it('When getting all products without passing a page, then find and return all products from that page', async (end) => {
            const expectedProd: Product[] = Array.of(generateProduct('Item 1'))
            mockedRepository.getAll.calledWith(1).mockReturnValue(wrapper<Product[]>(expectedProd))

            const response = await request.get('/products?page=1').expect(200).expect('Content-Type', /json/)

            const body: Product[] = response.body.map(
                (it: Product) => new Product({ ...it, created: new Date(it.created) }, it.id)
            )

            expect(body).toEqual(expectedProd)
            expect(mockedRepository.getAll).toBeCalledWith(1)

            end()
        })

        it('When there are no products, then return empty list', async (end) => {
            const expectedProd: Product[] = []
            mockedRepository.getAll.calledWith(1).mockReturnValue(wrapper<Product[]>(expectedProd))

            const response = await request.get('/products?page=1').expect(200).expect('Content-Type', /json/)

            expect(response.body).toEqual(expectedProd)
            expect(mockedRepository.getAll).toBeCalledWith(1)

            end()
        })
    })

    describe('GET /products/{id}', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it('When request a single product, then return it with 200 status code', async (end) => {
            const expectedProd: Product = generateProduct('Test')
            const id: string = v4()

            mockedRepository.getById.calledWith(id).mockReturnValue(wrapper<Product>(expectedProd))

            const response = await request.get(`/products/${id}`).expect(200).expect('Content-Type', /json/)

            const it = response.body

            const body: Product = new Product({ ...it, created: new Date(it.created) }, it.id)

            expect(body).toEqual(expectedProd)

            end()
        })

        it('When request a single product, then throw error and return 404 status code', async (end) => {
            const id: string = v4()

            mockedRepository.getById.calledWith(id).mockReturnValue(wrapper<Product>(null))

            const response = await request.get(`/products/${id}`).expect(404).expect('Content-Type', /json/)

            expect(response.body.message).toEqual('Product not found')
            expect(mockedRepository.getById).toBeCalledWith(id)

            end()
        })
    })

    describe('POST /products', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it('When post /products, then create and return product id with status code 201', async (end) => {
            const expectedProd: any = generateProduct('Test')
            const id: string = v4()
            const created: Product = new Product({ ...expectedProd, id }, id)

            mockedRepository.create.calledWith(anyObject(expectedProd)).mockReturnValue(wrapper<Product>(created))

            const response = await request
                .post(`/products`)
                .send(expectedProd)
                .set('Content-Type', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)

            const it: SimpleId = response.body

            expect(it).toEqual(new SimpleId(id))

            end()
        })

        it('When repository return invalid creation, then throw error with status 500', async (end) => {
            const expectedProd: any = generateProduct('Test')
            const id: string = v4()
            const created: Product = new Product({ ...expectedProd, id }, id)

            mockedRepository.create.calledWith(expectedProd).mockReturnValue(wrapper<Product>(null))

            const response = await request
                .post(`/products`)
                .send(expectedProd)
                .set('Content-Type', 'application/json')
                .expect(500)
                .expect('Content-Type', /json/)

            expect(response.body.message).toEqual('Error creating product')

            end()
        })
    })

    describe('PUT /products', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it('When updating an existing product, then update return status code 204', async (end) => {
            const initialProduct: any = generateProduct('Test')
            const id: string = v4()

            mockedRepository.update.calledWith(id, anyObject(initialProduct)).mockReturnValue(wrapper<boolean>(true))

            await request.put(`/products/${id}`).send(initialProduct).set('Accept', 'application/json').expect(204)

            const expected: Product = new Product({ ...initialProduct }, id)

            expect(mockedRepository.update).toBeCalledWith(id, anyObject(expected))

            end()
        })

        it('When updating a non existing product, then return status code 404 - not found product', async (end) => {
            const initialProduct: any = generateProduct('Test')
            const id: string = v4()

            mockedRepository.update.calledWith(id, anyObject(initialProduct)).mockReturnValue(wrapper<boolean>(false))

            const response = await request
                .put(`/products/${id}`)
                .send(initialProduct)
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)

            expect(response.body.message).toEqual('Product not found')

            end()
        })
    })

    describe('DELETE /products/{id}', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it("When deleting a product, then return 204 even if it doesn't exists for idempotent key", async (end) => {
            const id: string = v4()

            mockedRepository.delete.calledWith(id).mockReturnThis()

            await request.delete(`/products/${id}`).send(id).set('Accept', 'application/json').expect(204)

            expect(mockedRepository.delete).toBeCalledWith(id)

            end()
        })
    })
})

describe('Unexpected errors', () => {
    describe('DELETE /products/{id}', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it('When deleting a product and got an unexpected error, then application should return 500 with treated error and message', async (end) => {
            const id: string = v4()

            mockedRepository.delete.calledWith(id).mockImplementation(() => {
                throw new Error('Unexpected error')
            })

            const response = await request
                .delete(`/products/${id}`)
                .send(id)
                .set('Accept', 'application/json')
                .expect(500)

            expect(mockedRepository.delete).toBeCalledWith(id)
            expect(response.body.message).toBe('Unexpected error')

            end()
        })

        it('When got an non instance of error, then return response 500 with generic error', async (end) => {
            const id: string = v4()

            mockedRepository.delete.calledWith(id).mockImplementation(() => {
                throw 'not an instance of Error'
            })
            const response = await request
                .delete(`/products/${id}`)
                .send(id)
                .set('Accept', 'application/json')
                .expect(500)

            expect(mockedRepository.delete).toBeCalledWith(id)
            expect(response.body.generic).toBe('not an instance of Error')

            end()
        })

        it('When deleting with wrong id pattern, then return response 400 with bad request message', async (end) => {
            const id: string = "error-pattern"

            const response = await request
                .delete(`/products/${id}`)
                .send(id)
                .set('Accept', 'application/json')
                .expect(400)

            expect(response.body.message[0].constraints.matches).not.toBeNull()

            end()
        })
    })

    describe('GET /not-found', () => {
        beforeEach(() => {
            mockReset(mockedRepository)
        })

        it("When reaching a route that doesn't exists", async (end) => {
            const response = await request.get(`/not-found`).set('Accept', 'application/json').expect(404)
            
            end()
        })
    })
})

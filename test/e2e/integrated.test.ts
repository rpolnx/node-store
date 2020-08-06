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

        it('When post /products, then create and return product id', async (end) => {
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
})

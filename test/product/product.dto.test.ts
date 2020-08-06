import { generateProduct } from './mock.utils'
import { Product } from '../../src/product/dto/product'
import { ValidationError, validate, validateOrReject } from 'class-validator'
import { Error } from 'mongoose'

describe('Product creation test', () => {
    describe('Creating', () => {
        it('When creating an object with id, should not create new id', async () => {
            const expected: any = generateProduct('Test 1')

            const actual = new Product({ ...expected, id: expected.id }, expected.id)

            expect(actual.id).toBe(expected.id)
            expect(actual).toEqual(expected)
        })

        it('When creating an object without id, should not create new id', async () => {
            const expected: Product = generateProduct('Test 1')
            const oldId: string = expected.id
            delete expected.id

            const actual = new Product({ ...expected })

            expect(actual.id === oldId).toBeFalsy
        })
    })

    describe('Validation', () => {
        it('When creating with id pattern wrong, should throw validation exception', async () => {
            const expected: Product = generateProduct('Test 1')
            expected.id = 'abc-2422'

            try {
                await validateOrReject(expected)
            } catch (e) {
                expect(e).toBeInstanceOf(Array)

                const iterable: any[] = e

                iterable.forEach((element) => {
                    expect(element).toBeInstanceOf(ValidationError)

                    if (!(element.property === 'id')) {
                        throw new Error('Argument not expected')
                    }

                    expect(/^id must match\D+/.test(element.constraints.matches)).toBeTruthy()
                    expect(/\D+ regular expression$/.test(element.constraints.matches)).toBeTruthy()
                })
            }
        })

        it('When creating an object with name empty, should throw validation exception', async () => {
            const expected: Product = generateProduct('Test 1')
            expected.name = ''

            try {
                await validateOrReject(expected)
            } catch (e) {
                expect(e).toBeInstanceOf(Array)

                const iterable: any[] = e

                iterable.forEach((element) => {
                    expect(element).toBeInstanceOf(ValidationError)

                    if (!(element.property === 'name')) {
                        throw new Error('Argument not expected')
                    }
                    expect(element.constraints.isNotEmpty).not.toBeNull()
                })
            }
        })

        it('When creating an object with price empty, should throw validation exception', async () => {
            const expected: Product = generateProduct('Test 1')
            expected.price = null

            try {
                await validateOrReject(expected)
            } catch (e) {
                expect(e).toBeInstanceOf(Array)

                const iterable: any[] = e

                iterable.forEach((element) => {
                    expect(element).toBeInstanceOf(ValidationError)

                    if (!(element.property === 'price')) {
                        throw new Error('Argument not expected')
                    }
                    expect(element.constraints.isNotEmpty).not.toBeNull()
                })
            }
        })

        it('When creating an object with category empty, should throw validation exception', async () => {
            const expected: Product = generateProduct('Test 1')
            expected.category = ""

            try {
                await validateOrReject(expected)
            } catch (e) {
                expect(e).toBeInstanceOf(Array)

                const iterable: any[] = e

                iterable.forEach((element) => {
                    expect(element).toBeInstanceOf(ValidationError)

                    if (!(element.property === 'category')) {
                        throw new Error('Argument not expected')
                    }
                    expect(element.constraints.isNotEmpty).not.toBeNull()
                })
            }
        })

        
        it('When creating an object with remainingUnits as double, should throw validation exception', async () => {
            const expected: Product = generateProduct('Test 1')
            expected.remainingUnits = 25.7

            try {
                await validateOrReject(expected)
            } catch (e) {
                expect(e).toBeInstanceOf(Array)

                const iterable: any[] = e

                iterable.forEach((element) => {
                    expect(element).toBeInstanceOf(ValidationError)

                    if (!(element.property === 'remainingUnits')) {
                        throw new Error('Argument not expected')
                    }
                    expect(element.constraints.isInt).not.toBeNull()
                })
            }
        })
    })
})

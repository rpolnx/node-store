import { Product } from '../../src/product/dto/product'

import { v4 } from 'uuid'

const generateProduct = (name: string) => {
    const id: string = v4()
    const obj: any = {
        name: name,
        description: '',
        price: 20.5,
        category: 'Some category',
        remainingUnits: 10,
        created: new Date(),
    }

    return new Product({ ...obj, id }, id)
}

const wrapper = async <T>(wrap: T) => {
    return await wrap
}

export { generateProduct, wrapper }

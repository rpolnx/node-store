import { Product } from '../../src/product/dto/product'

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

const wrapper = async <T> (wrap: T) => {
    return await wrap
}

export {generateProduct, wrapper} 

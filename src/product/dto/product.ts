const v4 = require('uuidv4')

export class Product {
    public id: string

    public name: string
    public description: string
    public price: number
    public category: string
    public remainingUnits: string

    constructor(props: Omit<Product, 'id'>, id?: string) {
        Object.assign(this, props)

        if (!id) {
            this.id = v4.uuid()
        }
    }
}

import { IsDate, IsInt, IsNotEmpty, IsNumber, Matches } from 'class-validator'
import { v4 } from 'uuid'

export class Product {
    @Matches(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
    public id: string

    @IsNotEmpty()
    public name: string

    public description: string

    @IsNotEmpty()
    @IsNumber()
    public price: number

    @IsNotEmpty()
    public category: string

    @IsInt()
    public remainingUnits: number

    @IsDate()
    public created: Date

    constructor(props: Omit<Product, 'id'>, id?: string) {
        Object.assign(this, props)

        if (!id) {
            this.id = v4()
            this.created = new Date()
        }
    }
}

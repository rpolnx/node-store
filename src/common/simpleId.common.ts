import { Matches } from 'class-validator'

export class SimpleId {
    @Matches(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/) private id: string
    constructor(id: string) {
        this.id = id
    }
}

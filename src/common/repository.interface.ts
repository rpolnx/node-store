import { SimpleId } from './simpleId.common'

export interface IPaginateRepository<T> {
    getAll(page: number): Promise<T[]>

    getById(id: string): Promise<T>

    create(object: T): Promise<T>

    update(id: string, object: T): Promise<boolean>

    delete(id: string): Promise<void>
}

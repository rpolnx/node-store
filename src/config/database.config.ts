import mongoose from 'mongoose'

const createConnection = async (): Promise<void> => {
    const host: string = process.env.MONGO_DB_HOST
    const database: string = process.env.MONGO_DB_DATABASE
    const user: string = process.env.MONGO_DB_ROOT_USER
    const password: string = process.env.MONGO_DB_ROOT_PASSWORD
    await mongoose.connect(`mongodb://${user}:${password}@${host}/${database}?authSource=admin`)
}

export { createConnection }

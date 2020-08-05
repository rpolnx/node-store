import mongoose, { Schema } from 'mongoose'

const ProductSchema: Schema = new Schema(
    {
        _id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        remainingUnits: { type: Number, required: true },
        created: { type: Date },
    },
    { versionKey: false }
)

const productSchema = mongoose.model('product', ProductSchema)
export { productSchema, ProductSchema }

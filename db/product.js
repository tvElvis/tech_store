import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    name: { type: String },
    price: { type: Number},
  }
)

export default model('product', productSchema)
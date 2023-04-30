import mongoose, { Document, Types } from 'mongoose';

const { Schema } = mongoose;

interface productData extends Document {
  name: string,
  productCode: string,
  price: number,
  category: Array<string>,
  manufactureDate: Date,
  expiryDate: Date,
  owner: Types.ObjectId,
  status: string,
  createdAt: Date,
  updatedAt: Date | null,
}

const productSchema = new Schema<productData>({
  name: String,
  productCode: String,
  price: Number,
  category: Array,
  manufactureDate: Date,
  expiryDate: Date,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

const Product = mongoose.model('Product', productSchema);

export default Product;

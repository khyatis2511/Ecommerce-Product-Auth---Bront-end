import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

interface productPriceData extends Document {
  productId: string,
  createdAt: Date,
  updatedAt: Date | null,
}

const productPriceSchema = new Schema<productPriceData>({
  productId: String,
  createdAt: Date,
  updatedAt: Date,
});

const ProductPrice = mongoose.model('ProductPrice', productPriceSchema);

export default ProductPrice;

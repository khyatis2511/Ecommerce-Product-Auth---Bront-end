import mongoose, { Document, Types } from 'mongoose';

const { Schema } = mongoose;

interface productPriceData extends Document {
  productId: Types.ObjectId,
  createdAt: Date,
  updatedAt: Date | null,
}

const productPriceSchema = new Schema<productPriceData>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  createdAt: Date,
  updatedAt: Date,
});

const ProductPrice = mongoose.model('ProductPrice', productPriceSchema);

export default ProductPrice;

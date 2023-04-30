import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

interface categoryData extends Document {
  name: string,
  products: Array<string>,
}

const categorySchema = new Schema<categoryData>({
  name: String,
  products: Array,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

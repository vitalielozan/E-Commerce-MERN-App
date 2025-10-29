import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  brand: { type: String },
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  images: [String],
  shortDesc: { type: String },
  description: { type: String },
  category: { type: String },
  typ: { type: String },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;

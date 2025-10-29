import mongoose from 'mongoose';
import Product from '../models/Product.js';

// get all product
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// get product by brand
export async function getProductByBrand(req, res) {
  const { brand } = req.params;
  try {
    const products = await Product.find({ brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
}

// get product by id
export async function getProductById(req, res) {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
}

// get raw product
export async function getRawProducts(req, res) {
  const productId = req.params.id;
  try {
    const products = await Product.find(productId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
}

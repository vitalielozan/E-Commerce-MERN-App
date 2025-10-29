import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

// get all from cart
export async function getProductsFromCart(req, res) {
  const userId = req.user.id;
  try {
    const products = await Cart.find({ user: userId })
      .populate('product')
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

// get a single from cart
export async function clearProductsFromCart(req, res) {
  const userId = req.user.id;
  try {
    await Cart.deleteMany({ user: userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

// add to cart
export async function addProductToCart(req, res) {
  const userId = req.user._id;
  const { productId } = req.body;
  if (!productId) {
    return res.status(404).json({ message: 'Missing product' });
  }
  try {
    const exist = await Cart.findOne({ user: userId, product: productId });
    if (exist) {
      return res.status(400).json({ message: 'Product already in cart' });
    }
    const newCartItem = new Cart({
      user: userId,
      product: productId,
    });
    const savedItem = await newCartItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

// delete from cart
export async function deleteProductFromCart(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProduct = await Cart.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

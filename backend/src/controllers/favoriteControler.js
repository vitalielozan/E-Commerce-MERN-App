import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Favorite from '../models/Favorite.js';
import Cart from '../models/Cart.js';

// get all from Favorite
export async function getProductsFromFavorite(req, res) {
  const userId = req.user._id;
  try {
    const products = await Favorite.find({ user: userId })
      .populate('product')
      .sort({
        createdAt: -1,
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

// add to Favorite
export async function addProductToFavorite(req, res) {
  const userId = req.user._id;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Missing product' });
  }
  try {
    const exist = await Favorite.findOne({ user: userId, product: productId });
    if (exist) {
      return res.status(404).json({ message: 'Product already in favorite' });
    }
    const newFavorite = new Favorite({
      user: userId,
      product: productId,
    });
    const savedFavorite = await newFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

// add product to cart from favorite

export async function addProductFromFavToCart(req, res) {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Missing product' });
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

// delete from Favorite
export async function deleteProductFromFavorite(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProduct = await Favorite.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error Server', error: error.message });
  }
}

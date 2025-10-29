import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email alredy in use' });
    }
    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
}

export async function updateCheckOut(req, res) {
  const userId = req.user.id;
  const { lastCheckout } = req.body;
  if (
    !lastCheckout.billingAddress ||
    !lastCheckout.shippingAddress ||
    !lastCheckout.cardNr
  ) {
    return res.status(400).json({ message: 'Missing checkout data' });
  }
  const cardLast4 = lastCheckout.cardNr.slice(-4);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          lastCheckout: {
            billingAddress: lastCheckout.billingAddress,
            shippingAddress: lastCheckout.shippingAddress,
            cardLast4,
            date: new Date(),
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Checkout update error:', error);
    res.status(500).json({ message: 'Error updating checkout address' });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error login user', error: error.message });
  }
}

export async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error geting users', error: error.message });
  }
}

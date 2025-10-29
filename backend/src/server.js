import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs-extra';
import { connectDB } from './configs/db.js';
import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import favoriteRouter from './routes/favoriteRouter.js';
import reviewRouter from './routes/reviewRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/reviews', reviewRouter);

// Frontend serving
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../frontend/dist');
  const indexFile = path.join(
    __dirname,
    '../../frontend',
    'dist',
    'index.html'
  );

  if (fs.existsSync(indexFile)) {
    app.use(express.static(distPath));
    app.get('/{*splat}', (req, res) => {
      res.sendFile(indexFile);
    });
  } else {
    console.error('index.html not exist in frontend/dist');
  }
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

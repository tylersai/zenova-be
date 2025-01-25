import mongoose from 'mongoose';
import { Product, ProductSchema } from '../src/product/product.schema';
import { products } from './products';
import { configDotenv } from 'dotenv';

configDotenv();

async function seedProducts() {
  // Connect to MongoDB
  const mongoURI = process.env.MONGO_URI;
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB');

  // Create the Product model
  const ProductModel = mongoose.model(Product.name, ProductSchema);

  try {
    // Insert data
    const result = await ProductModel.insertMany(products);
    console.log('Products seeded:', result);
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
seedProducts();

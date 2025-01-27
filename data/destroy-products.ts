import mongoose from 'mongoose';
import { Product, ProductSchema } from '../src/product/product.schema';
import { configDotenv } from 'dotenv';

configDotenv();

async function deleteProducts() {
  // Connect to MongoDB
  const mongoURI = process.env.MONGO_URI;
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB');

  // Create the Product model
  const ProductModel = mongoose.model(Product.name, ProductSchema);

  try {
    // Delete all data
    const result = await ProductModel.deleteMany({}).exec();
    console.log('Products deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting products:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
deleteProducts();

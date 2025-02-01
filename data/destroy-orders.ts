import mongoose from 'mongoose';
import { Order, OrderSchema } from '../src/order/order.schema';
import { configDotenv } from 'dotenv';

configDotenv();

async function deleteOrders() {
  // Connect to MongoDB
  const mongoURI = process.env.MONGO_URI;
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB');

  // Create the Order model
  const OrderModel = mongoose.model(Order.name, OrderSchema);

  try {
    // Delete all data
    const result = await OrderModel.deleteMany({}).exec();
    console.log('Orders deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting orders:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
deleteOrders();

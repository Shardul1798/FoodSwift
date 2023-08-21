import mongoose from 'mongoose';
import User from './models/user.model';
import Session from './models/session.model';

export async function connectToDatabase(uri:string) {
  try {
    await mongoose.connect('mongodb://localhost:27017/food_swift', {
    });
    User.createCollection();
    Session.createCollection();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
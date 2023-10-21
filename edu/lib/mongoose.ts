import mongoose from 'mongoose';
import { logger } from './logger';

let isConnected = false;// Variable to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (!process.env.MONGODB_URI) return logger.info('MONGODB_URI is not defined');
    if (isConnected) return logger.info('=> using existing database connection');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        logger.info('MongoDB Connected');
    } catch (error: any) {
        return new Error(error);
    }
}
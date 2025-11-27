// src/db.js

import mogoose from 'mongoose';
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
    const db = mogoose.connection;

    db.on('open', () => {
        console.log(`MongoDB connected to ${db.name}`);
    });

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    try {
        await mogoose.connect(MONGODB_URI);
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || '';

if (!DB_URL) {
    throw new Error('Please define the DB_URL environment variable');
};

let isConnected = 0;

export default async function dbConnection() {

    if (isConnected) {
        console.log('Using existing database connection');
        return;
    };

    if (mongoose.connections.length > 0) {
        isConnected = mongoose.connections[0].readyState;

        if (isConnected) {
            console.log('Reusing existing database connection');
            return;
        };
    };

    try {

        await mongoose.connect(DB_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            isConnected = 1;
            console.log('Database connected successfully');
        });


    } catch (error) {

        console.error('Error connecting to database:', error);
        throw new Error(`Error connecting to database: ${error}`);
    };

};


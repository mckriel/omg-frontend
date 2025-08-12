#!/usr/bin/env node

const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection configuration from .env
const MONGODB_URI = process.env.MONGODB;
const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = 'raid-progress';

async function getRaidProgress() {
    let client;
    
    try {
        // Validate environment variables
        if (!MONGODB_URI || !DATABASE_NAME) {
            throw new Error('Missing required environment variables: MONGODB and DATABASE_NAME');
        }
        
        // Connect to MongoDB
        console.log(`Connecting to MongoDB: ${DATABASE_NAME} database`);
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB successfully');
        
        // Get the database and collection
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);
        
        // Find all documents in the raid-progress collection
        const documents = await collection.find({}).toArray();
        
        console.log(`Found ${documents.length} documents in ${COLLECTION_NAME} collection:`);
        console.log('\n' + '='.repeat(50));
        
        // Print each document
        documents.forEach((doc, index) => {
            console.log(`\nDocument ${index + 1}:`);
            console.log(JSON.stringify(doc, null, 2));
            console.log('-'.repeat(30));
        });
        
    } catch (error) {
        console.error('Error fetching raid progress data:', error);
    } finally {
        // Close the connection
        if (client) {
            await client.close();
            console.log('\nMongoDB connection closed');
        }
    }
}

// Run the script
getRaidProgress();
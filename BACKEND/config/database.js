const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log('\n✅ MongoDB Connected Successfully!');
        console.log(`   Host: ${conn.connection.host}`);
        console.log(`   Database: ${conn.connection.name}`);
        console.log(`   Port: ${conn.connection.port}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });
        
        return conn;
    } catch (error) {
        console.error('\n❌ MongoDB Connection Failed!');
        console.error(`   Error: ${error.message}`);
        console.error('   Please check your .env file MONGO_URI');
        process.exit(1);
    }
};

module.exports = connectDB;
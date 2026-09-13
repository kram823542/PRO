const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('  Connecting to MongoDB Atlas...');
    
    const startTime = Date.now();
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    const duration = Date.now() - startTime;

    console.log(`  ✅ MongoDB Connected in ${duration}ms`);
    console.log(`  📊 Host: ${conn.connection.host}`);
    console.log(`  📊 Database: ${conn.connection.name}`);
    console.log(`  📊 State: ${getConnectionState(conn.connection.readyState)}`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('  🔗 MongoDB event: connected');
    });

    mongoose.connection.on('error', (err) => {
      console.log(`  ❌ MongoDB event error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('  ⚠️  MongoDB event: disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('  🔄 MongoDB event: reconnected');
    });

  } catch (error) {
    console.error(`  ❌ MongoDB Connection Error: ${error.message}`);
    console.error(`  💡 Check your MONGODB_URI in .env file`);
    console.error(`  💡 Check if your IP is whitelisted in MongoDB Atlas`);
    process.exit(1);
  }
};

const getConnectionState = (state) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  return states[state] || 'Unknown';
};

module.exports = connectDB;
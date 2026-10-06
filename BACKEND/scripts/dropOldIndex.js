import mongoose from 'mongoose';
import '../src/config/env.js';
import { connectDB } from '../src/config/database.js';

const run = async () => {
  await connectDB();
  const db = mongoose.connection.db;
  const coll = db.collection('messagerecipients');

  const indexes = await coll.indexes();
  console.log('\n📋 Current indexes:');
  indexes.forEach((ix) => console.log('  •', ix.name, ix.unique ? '(unique)' : ''));

  const toDrop = [
    'messageId_1_employeeId_1',
    'employeeId_1',
    'employeeId_1_status_1',
  ];

  for (const name of toDrop) {
    const found = indexes.find((ix) => ix.name === name);
    if (found) {
      try {
        await coll.dropIndex(name);
        console.log(`✅ Dropped old index: ${name}`);
      } catch (e) {
        console.log(`⚠️ Could not drop ${name}: ${e.message}`);
      }
    }
  }

  console.log('\n👉 Restart backend — Mongoose will recreate indexes automatically');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
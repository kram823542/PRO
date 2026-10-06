/**
 * Usage:
 *   node scripts/createSuperAdmin.js admin@example.com StrongPass123 "Super Admin"
 */
import mongoose from 'mongoose';
import { connectDB } from '../src/config/database.js';
import { User } from '../src/modules/users/user.model.js';
import { logger } from '../src/utils/logger.js';

const run = async () => {
  const [username, password, name = 'Super Admin'] = process.argv.slice(2);
  if (!username || !password) {
    console.error('Usage: node createSuperAdmin.js <username> <password> [name]');
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ username: username.toLowerCase() });
  if (existing) {
    console.log('User already exists');
    process.exit(0);
  }

  await User.create({
    username: username.toLowerCase(),
    password,
    role: 'SUPER_ADMIN',
    name,
    mustChangePassword: false,
    status: 'ACTIVE',
  });

  logger.info(`✅ Super Admin created: ${username}`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


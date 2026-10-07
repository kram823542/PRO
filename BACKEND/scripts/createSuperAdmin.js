// /**
//  * Usage:
//  *   node scripts/createSuperAdmin.js admin@example.com StrongPass123 "Super Admin"
//  */
// import mongoose from 'mongoose';
// import { connectDB } from '../src/config/database.js';
// import { User } from '../src/modules/users/user.model.js';
// import { logger } from '../src/utils/logger.js';

// const run = async () => {
//   const [username, password, name = 'Super Admin'] = process.argv.slice(2);
//   if (!username || !password) {
//     console.error('Usage: node createSuperAdmin.js <username> <password> [name]');
//     process.exit(1);
//   }

//   await connectDB();

//   const existing = await User.findOne({ username: username.toLowerCase() });
//   if (existing) {
//     console.log('User already exists');
//     process.exit(0);
//   }

//   await User.create({
//     username: username.toLowerCase(),
//     password,
//     role: 'SUPER_ADMIN',
//     name,
//     mustChangePassword: false,
//     status: 'ACTIVE',
//   });

//   logger.info(`✅ Super Admin created: ${username}`);
//   await mongoose.connection.close();
//   process.exit(0);
// };

// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });







import mongoose from 'mongoose';
import { connectDB } from '../src/config/database.js';
import { User } from '../src/modules/users/user.model.js';
import { logger } from '../src/utils/logger.js';

const run = async () => {
  const [username, password, name = 'Super Admin'] = process.argv.slice(2);

  if (!username || !password) {
    console.error('\n❌ Usage: node scripts/createSuperAdmin.js <username> <password> [name]');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters');
    process.exit(1);
  }

  await connectDB();

  try {
    const uname = username.toLowerCase();
    const existing = await User.findOne({ username: uname });

    if (existing) {
      console.log('🔍 User exists — updating password...');

      existing.password = password; // pre-save hook hashes
      existing.name = name;
      existing.status = 'ACTIVE';
      existing.mustChangePassword = false;
      existing.loginAttempts = 0;
      existing.lockUntil = null;
      await existing.save();

      logger.info('═══════════════════════════════════════');
      logger.info(`✅ Super Admin password RESET: ${uname}`);
      logger.info(`   New Password: ${password}`);
      logger.info('═══════════════════════════════════════');
    } else {
      await User.create({
        username: uname,
        password,
        role: 'SUPER_ADMIN',
        name,
        mustChangePassword: false,
        status: 'ACTIVE',
      });

      logger.info('═══════════════════════════════════════');
      logger.info(`✅ Super Admin CREATED: ${uname}`);
      logger.info('═══════════════════════════════════════');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

run().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
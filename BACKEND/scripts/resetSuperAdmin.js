/**
 * Super Admin Password Reset Script
 *
 * Usage:
 *   node scripts/resetSuperAdmin.js <username> <newPassword>
 *
 * Example:
 *   node scripts/resetSuperAdmin.js superadmin "NewStrongPass@123"
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/database.js';
import { User } from '../src/modules/users/user.model.js';

const run = async () => {
  const [username, newPassword] = process.argv.slice(2);

  if (!username || !newPassword) {
    console.error('\n❌ Usage: node scripts/resetSuperAdmin.js <username> <newPassword>');
    console.error('Example: node scripts/resetSuperAdmin.js superadmin "NewPass@123"\n');
    process.exit(1);
  }

  if (newPassword.length < 8) {
    console.error('❌ Password must be at least 8 characters');
    process.exit(1);
  }

  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
    console.error('❌ Password must contain letters and numbers');
    process.exit(1);
  }

  await connectDB();

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      console.error(`❌ User not found: ${username}`);
      process.exit(1);
    }

    if (user.role !== 'SUPER_ADMIN') {
      console.error(`⚠️  Warning: This user is not SUPER_ADMIN (role: ${user.role})`);
      console.error('   Continue? Resetting anyway...');
    }

    // Set new password — pre-save hook hashes it
    user.password = newPassword;
    user.mustChangePassword = false;
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.status = 'ACTIVE';
    await user.save();

    console.log('\n✅ SUCCESS!');
    console.log('═══════════════════════════════════════');
    console.log(`   Username: ${user.username}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`   Role:     ${user.role}`);
    console.log('═══════════════════════════════════════');
    console.log('   You can now login with the new password.\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
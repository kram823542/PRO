const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const userId = 'kundan@82';
    const name = 'Kundan Kumar';
    const plainPassword = 'admin123'; // ← change this

    const existing = await User.findOne({ userId });
    if (existing) {
      console.log('⚠️  Super Admin already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    const user = await User.create({
      userId,
      name,
      passwordHash,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    });

    console.log('✅ Super Admin created successfully!');
    console.log('   User ID:', userId);
    console.log('   Password:', plainPassword);
    console.log('   Role:', user.role);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();
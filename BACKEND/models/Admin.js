const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// 🔥 पासवर्ड हैश करने का middleware - बिना next के
adminSchema.pre('save', async function() {
  try {
    // अगर पासवर्ड मॉडिफाई नहीं हुआ है तो हैश मत करो
    if (!this.isModified('password')) {
      return;
    }
    
    console.log('🔐 Hashing password for:', this.email);
    
    // Salt generate करें (10 rounds)
    const salt = await bcrypt.genSalt(10);
    
    // पासवर्ड हैश करें
    const hashedPassword = await bcrypt.hash(this.password, salt);
    
    // हैश किया हुआ पासवर्ड सेव करें
    this.password = hashedPassword;
    
    console.log('✅ Password hashed successfully');
  } catch (error) {
    console.error('❌ Error hashing password:', error);
    throw error; // error throw करें, next() नहीं
  }
});

// पासवर्ड वेरिफाई करने का मेथड
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('🔍 Comparing passwords...');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('📊 Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('❌ Error comparing password:', error);
    throw error;
  }
};

module.exports = mongoose.model('Admin', adminSchema);
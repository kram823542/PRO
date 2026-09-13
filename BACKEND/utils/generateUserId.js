const User = require('../models/User');
const Employee = require('../models/Employee');

// Generate unique user ID based on role and parameters
const generateUserId = async (role, params = {}) => {
  let baseId = '';
  let counter = 1;
  let userId = '';

  switch (role) {
    case 'SUPER_ADMIN':
      baseId = 'admin';
      break;
      
    case 'CLF_ADMIN':
      const clfCode = params.clfCode || 'CLF';
      baseId = clfCode.toLowerCase() + 'admin';
      break;
      
    case 'EMPLOYEE':
      const clfPrefix = params.clfPrefix || 'emp';
      baseId = clfPrefix.toLowerCase();
      break;
      
    default:
      baseId = 'user';
  }

  // Check if ID already exists and generate unique one
  let exists = true;
  while (exists) {
    userId = counter === 1 ? baseId : `${baseId}${counter}`;
    
    // Check in User model
    const userExists = await User.findOne({ userId });
    // Check in Employee model
    const employeeExists = await Employee.findOne({ userId });
    
    if (!userExists && !employeeExists) {
      exists = false;
    } else {
      counter++;
    }
  }

  return userId;
};

// Validate user ID format
const validateUserId = (userId) => {
  // Should contain @ symbol for employee format
  if (userId.includes('@')) {
    const [name, suffix] = userId.split('@');
    if (name && suffix && !isNaN(suffix)) {
      return true;
    }
  }
  
  // For admin users without @
  if (userId.includes('admin')) {
    return true;
  }
  
  return false;
};

module.exports = { generateUserId, validateUserId };
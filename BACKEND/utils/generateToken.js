const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      userId: user.userId,
      role: user.role,
      clfId: user.clfId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d', // Token expires in 30 days
    }
  );
};

module.exports = generateToken;
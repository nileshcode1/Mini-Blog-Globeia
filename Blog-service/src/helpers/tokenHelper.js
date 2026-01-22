const jwt = require('jsonwebtoken');

const tokenHelper = {
  generateToken: (userId) => {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );
  },

  verifyToken: (token) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
    );
  }
};

module.exports = tokenHelper;
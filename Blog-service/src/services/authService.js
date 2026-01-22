const User = require('../models/User');
const { generateToken } = require('../helpers/tokenHelper');

const authService = {
  registerUser: async (email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        email: user.email
      }
    };
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        email: user.email
      }
    };
  }
};

module.exports = authService;
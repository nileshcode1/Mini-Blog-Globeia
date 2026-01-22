const authService = require('../services/authService');
const { validationResult } = require('express-validator');
const { handleValidationErrors } = require('../helpers/errorHelper');

const authController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleValidationErrors(res, errors);
      }

      const { email, password } = req.body;
      const result = await authService.registerUser(email, password);
      
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleValidationErrors(res, errors);
      }

      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      
      res.json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error' });
    }
  },

  getProfile: async (req, res) => {
    try {
      res.json({
        user: {
          id: req.user._id,
          email: req.user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = authController;
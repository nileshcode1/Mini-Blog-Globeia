const errorHelper = {
  handleValidationErrors: (res, errors) => {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  },

  handleServerError: (res, error, message = 'Server error') => {
    console.error('Server Error:', error);
    return res.status(500).json({ message });
  },

  handleNotFound: (res, message = 'Resource not found') => {
    return res.status(404).json({ message });
  },

  handleUnauthorized: (res, message = 'Unauthorized access') => {
    return res.status(401).json({ message });
  },

  handleForbidden: (res, message = 'Access forbidden') => {
    return res.status(403).json({ message });
  }
};

module.exports = errorHelper;
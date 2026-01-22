const blogService = require('../services/blogService');
const { validationResult } = require('express-validator');
const { handleValidationErrors } = require('../helpers/errorHelper');
const { deleteFile } = require('../helpers/fileHelper');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await blogService.getAllBlogs(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await blogService.getBlogById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  createBlog: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return handleValidationErrors(res, errors);
      }

      const { title, content } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const authorId = req.user._id;

      const blog = await blogService.createBlog({ title, content, imagePath, authorId });
      res.status(201).json(blog);
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return handleValidationErrors(res, errors);
      }

      const blogId = req.params.id;
      const { title, content } = req.body;
      const newImagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const userId = req.user._id;

      const blog = await blogService.updateBlog(blogId, { title, content, newImagePath, userId });
      
      if (!blog) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      if (error.message === 'Not authorized') {
        return res.status(403).json({ message: 'Not authorized to update this blog' });
      }
      
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const userId = req.user._id;

      const result = await blogService.deleteBlog(blogId, userId);
      
      if (!result) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      if (error.message === 'Not authorized') {
        return res.status(403).json({ message: 'Not authorized to delete this blog' });
      }
      
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = blogController;
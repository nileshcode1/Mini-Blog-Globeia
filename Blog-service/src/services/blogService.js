const Blog = require('../models/Blog');
const { deleteFile } = require('../helpers/fileHelper');
const path = require('path');

const blogService = {
  getAllBlogs: async (page, limit) => {
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate('author', 'email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return {
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  },

  getBlogById: async (id) => {
    const blog = await Blog.findById(id).populate('author', 'email');
    return blog;
  },

  createBlog: async ({ title, content, imagePath, authorId }) => {
    const blog = new Blog({
      title,
      content,
      image: imagePath,
      author: authorId
    });

    await blog.save();
    await blog.populate('author', 'email');

    return blog;
  },

  updateBlog: async (blogId, { title, content, newImagePath, userId }) => {
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return null;
    }

    if (blog.author.toString() !== userId.toString()) {
      throw new Error('Not authorized');
    }

    // If new image is uploaded, delete old image
    if (newImagePath && blog.image) {
      const oldImagePath = path.join(__dirname, '../../', blog.image);
      deleteFile(oldImagePath);
    }
    
    blog.title = title;
    blog.content = content;
    
    // Update image if new one is uploaded
    if (newImagePath) {
      blog.image = newImagePath;
    }
    
    await blog.save();
    await blog.populate('author', 'email');

    return blog;
  },

  deleteBlog: async (blogId, userId) => {
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return null;
    }

    if (blog.author.toString() !== userId.toString()) {
      throw new Error('Not authorized');
    }

    // Delete associated image file if it exists
    if (blog.image) {
      const imagePath = path.join(__dirname, '../../', blog.image);
      deleteFile(imagePath);
    }

    await Blog.findByIdAndDelete(blogId);
    return true;
  }
};

module.exports = blogService;
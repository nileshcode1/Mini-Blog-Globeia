const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { blogValidation } = require('../utils/validators');

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', auth, upload.single('image'), blogValidation, blogController.createBlog);
router.put('/:id', auth, upload.single('image'), blogValidation, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
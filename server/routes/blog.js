const router = require('express').Router();

const {
  getAllBlogs,
  getSingleBlog,
  getSingleBlogComments,
  addComment,
  createBlog,
  editBlog,
  deleteBlog,
  addLike,
  removeLike,
} = require('../controllers/blogController');

const { isAuth } = require('../middleware/authMiddleware');

router.get('/', getAllBlogs);

router.get('/:id', isAuth, getSingleBlog);

router.get('/:id/comments', getSingleBlogComments);

router.post('/:id/add-comment', addComment);

router.put('/:id/like', addLike);
router.put('/:id/unlike', removeLike);

router.post('/create', isAuth, createBlog);

router.put('/edit/:id', isAuth, editBlog);

router.delete('/delete/:id', isAuth, deleteBlog);

module.exports = router;

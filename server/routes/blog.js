const router = require("express").Router();

const {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    editBlog,
    deleteBlog
} = require("../controllers/blogController");

const { isAuth } = require("../middleware/authMiddleware");

router.get('/', getAllBlogs);

router.get('/:id',isAuth, getSingleBlog);

router.post('/create', isAuth, createBlog);

router.put('/edit/:id', isAuth, editBlog);

router.delete('/delete/:id', isAuth, deleteBlog);

module.exports = router;
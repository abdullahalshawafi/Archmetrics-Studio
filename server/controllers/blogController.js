const Blog = require('../models/Blog');
const BlogComment = require('../models/BlogComment');
const moment = require('moment');
const commentValidations = require('../validations/commentValidations');
const trimInputFields = require('../helpers/trimInputFields');
const { uploadToGCP, deleteFile } = require('./imageController');

module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      let blogs = await Blog.find({}, '-__v').sort({ createdAt: 'desc' });

      res.status(200).json({ blogs });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  getSingleBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id, '-__v').populate(
        'comments',
        'name email comment date',
        null,
        {
          sort: { createdAt: 'desc' },
        },
      );

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json({ blog });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  getSingleBlogComments: async (req, res) => {
    try {
      let comments = await BlogComment.find(
        { blogId: req.params.id },
        '-__v',
      ).sort({ createdAt: 'desc' });

      res.status(200).json({ comments });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  addComment: async (req, res) => {
    try {
      for (const field in req.body) {
        if (Object.hasOwnProperty.call(req.body, field)) {
          req.body[field] = req.body[field].trim();
          if (field === 'email') {
            req.body[field] = req.body[field].toLowerCase();
          }
        }
      }

      const { error } = commentValidations.validate(req.body);

      if (error) {
        const errorMessages = {};
        error.details.forEach((err) => {
          errorMessages[err.context.label] = err.message;
        });
        return res.json({ errorMessages });
      }

      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      const { name, email, comment } = req.body;

      const newComment = new BlogComment({
        blogId: req.params.id,
        name,
        email,
        comment,
        date: moment().format('h:mm A | Do MMM YYYY'),
      });

      blog.comments.push(newComment);

      await newComment.save();
      await blog.save();

      res.status(200).json({ message: 'Comment added successfully!' });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  addLike: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      blog.likes += 1;

      await blog.save();

      res.status(200).json({ message: 'Like added successfully' });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  removeLike: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      blog.likes -= 1;

      await blog.save();

      res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  createBlog: async (req, res) => {
    try {
      trimInputFields(req.body);

      if (req.body.images) {
        req.body.images = req.body.images.map((img) => {
          uploadToGCP(img);
          return process.env.CLOUD_STORAGE_PATH + img;
        });
      }

      let blog = await Blog.create(req.body);

      return res
        .status(200)
        .json({ message: 'Blog created successfully', blog });
    } catch (err) {
      console.log(err);
      await req.body.images.forEach((image) => {
        image.includes(process.env.CLOUD_STORAGE_PATH) && deleteFile(image);
      });
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  editBlog: async (req, res) => {
    try {
      trimInputFields(req.body);
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      let images = req.body.images;

      blog.images.forEach((image) => {
        !images.includes(image) && deleteFile(image);
      });

      images = images.map((image) => {
        if (image.includes(process.env.CLOUD_STORAGE_PATH)) {
          return image;
        }
        uploadToGCP(image);
        return process.env.CLOUD_STORAGE_PATH + image;
      });

      req.body.images = images;

      let new_blog = await Blog.findByIdAndUpdate(req.params.id, req.body);

      return res
        .status(200)
        .json({ message: 'Blog updated successfully', blog: new_blog });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      blog.images.forEach((image) => {
        deleteFile(image);
      });

      await BlogComment.deleteMany({ blogId: blog._id });

      return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error has occurred please try again' });
    }
  },
};

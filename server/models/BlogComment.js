const mongoose = require('mongoose');

const BlogComment = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
      index: true,
    },
    name: String,
    email: String,
    comment: String,
    date: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('BlogComment', BlogComment);

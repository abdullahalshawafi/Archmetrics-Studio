const mongoose = require('mongoose');

const BlogComment = new mongoose.Schema(
  {
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Blog',
    },
    name: String,
    email: String,
    comment: String,
    date: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('BlogComment', BlogComment);

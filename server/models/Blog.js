const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      minLength: 3,
      maxLength: 40,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

blogSchema.virtual('Comments', {
  ref: 'BlogComment',
  localField: '_id',
  foreignField: 'blogID',
});

module.exports = mongoose.model('Blog', blogSchema);

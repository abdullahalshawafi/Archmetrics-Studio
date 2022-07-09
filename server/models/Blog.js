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
    comments: {
      type: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          email: String,
          comment: String,
          date: String,
        },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Blog', blogSchema);

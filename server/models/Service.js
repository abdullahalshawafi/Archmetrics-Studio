const mongoose = require('mongoose');
const Project = require('./Project');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 40,
      required: true,
    },
    slug: {
      type: String,
      minLength: 3,
      maxLength: 40,
      unique: true,
      required: true,
    },
    summary: {
      type: String,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Service', serviceSchema);

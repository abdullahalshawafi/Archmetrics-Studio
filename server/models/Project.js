const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: 2000,
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
    client: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

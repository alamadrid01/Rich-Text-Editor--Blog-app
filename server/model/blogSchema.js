const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Blogs = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  blogImage: {
    image: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  refreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("blog", Blogs);

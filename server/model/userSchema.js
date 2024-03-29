const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    bio: {
      type: String,
      default: "",
    },
    available: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    socialLinks: [
      {
        facebook: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
        instagram: {
          type: String,
          default: "",
        },
        stack: {
          type: String,
          default: "",
        },
        github: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
        website: {
          type: String,
          default: "",
        },
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;

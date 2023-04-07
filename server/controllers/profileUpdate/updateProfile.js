const User = require("../../model/userSchema");
const mongoose = require("mongoose");

const UpdateProfile = async (req, res) => {
  const id = req.params.id;
  const {
    fName,
    username,
    location,
    bio,
    available,
    twitter,
    instagram,
    github,
    stack,
    facebook,
    website,
    link,
    email,
  } = req.body;
  const file = req.file;
  const {path} = file;

  if (!id) return res.status(401).json({ message: "Id is required" });

  // Check if it is a valid Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid ID" });
  }

  const links = {
    facebook,
    twitter,
    instagram,
    stack,
    github,
    link,
    website,
  };

  const updatedFields = {
    bio: bio,
    fullName: fName,
    username: username,
    location: location,
    available: available,
    email: email,
    avatar: path,
    $set: {
      socialLinks: [links],
    },
  };

  const result = await User.findByIdAndUpdate({ _id: id }, updatedFields, {
    new: true,
  }).exec();
  if (!result) return res.sendStatus(404);
  res.sendStatus(204);
};

module.exports = UpdateProfile;

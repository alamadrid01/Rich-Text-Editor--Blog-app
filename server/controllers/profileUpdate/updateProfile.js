const User = require("../../model/userSchema");
const mongoose = require("mongoose");

const UpdateProfile = async (req, res) => {
    const id = req.params.id;
    const {fName, username, location, bio, available, twitter, instagram, github, stack, facebook, website, link, email} = req.body;
    // const {image} = req.file;
    // console.log(image);

    if(!id) return res.status(401).json({message: "Id is required"})

        // Check if it is a valid Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid ID" });
    }

const updatedFields = {
  bio: bio,
  fullName: fName,
  username: username,
  location: location,
  available: available,
  email: email,
  $set: {
    "socialLinks.$[facebook].facebook": facebook,
    "socialLinks.$[twitter].twitter": twitter,
    "socialLinks.$[instagram].instagram": instagram,
    "socialLinks.$[stack].stack": stack,
    "socialLinks.$[github].github": github,
    "socialLinks.$[link].link": link,
    "socialLinks.$[website].website": website,
  },
};

const arrayFilters = [
  { "facebook.facebook": { $exists: true } },
  { "twitter.twitter": { $exists: true } },
  { "instagram.instagram": { $exists: true } },
  { "stack.stack": { $exists: true } },
  { "github.github": { $exists: true } },
  { "link.link": { $exists: true } },
  { "website.website": { $exists: true } },
];

const result = await User.findByIdAndUpdate({ _id: id }, updatedFields, {
  new: true,
  arrayFilters,
}).exec();

if (!result) return res.sendStatus(404);
res.status(200).json({ result: result });

}

module.exports =  UpdateProfile
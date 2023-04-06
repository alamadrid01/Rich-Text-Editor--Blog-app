const User = require("../../model/userSchema");
const mongoose = require("mongoose");

const UpdateProfile = async (req, res) => {
    const id = req.params.id;
    const {fName, username, location, bio, available, twitter, instagram, github, stack, facebook, website, link, email} = req.body;
    const {image} = req.file;
    console.log(image);

    if(!id) return res.status(401).json({message: "Id is required"})

        // Check if it is a valid Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid ID" });
    }

   const updataedField = {
     bio: bio,
     fullName: fName,
     username: username,
     location: location,
     available: available,
     email: email,
     "socialLinks.facebook": facebook,
     "socialLinks.github": github,
     "socialLinks.twitter": twitter,
     "socialLinks.instagram": instagram,
     "socialLinks.stack": stack,
     "socialLinks.website": website,
     "socialLinks.link": link,
     
   };
    
    //  Finf user by id and update the fields
    const result =  await User.findByIdAndUpdate({_id: id}, {$set: updataedField}, {new: true}).exec();
    if (!result) return res.sendStatus(404);

    res.sendStatus(204);
}

module.exports =  UpdateProfile
const User = require("../../model/userSchema");
const mongoose = require("mongoose");

const GetUser = async (req, res) => {
    const id = req.params.id;

    if(!id) return res.status(400).json({message: "Id is required"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({message: "Id is not a valid type"});

    try{
         const findUser = await User.findOne({ _id: id }).exec();

         if (!findUser)
           return res.status(401).json({ message: "No user found" });

         res.json({
           userId: findUser._id,
           name: findUser.fullName,
           email: findUser.email,
           avatar: findUser.avatar,
           username: findUser.username,
           bio: findUser.bio,
           follwoers: findUser.followers,
           following: findUser.following,
           posts: findUser.posts,
           social: findUser.socialLinks,
           available: findUser.available,
           location: findUser.location,
         });

    }catch(err){
        res.status(500).json(err.message);
    }
}

module.exports = GetUser;
const User = require("../../model/userSchema");
const mongoose = require("mongoose");

const Bio = async (req, res) => {
    const id = req.params.id;
    const {text} = req.body

    if(!id || !text) return res.status(400).json({message: "Id and bio text required"})

        // Check if it is a valid Id
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid ID" });
    }

    // Find user by id
    const user = await User.findOne({_id: id}).exec();
    if(!user) return res.sendStatus(404);

    user.bio = text;
    await user.save();
    res.sendStatus(204);
}

module.exports =  Bio
const { default: mongoose } = require("mongoose");
const User = require("../../model/userSchema");


const getHistory = async (req, res) => {
    const userId = req.params.userId;

    if(!userId) return res.status(400).json({message: "ID is required"});
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(401).json({message: "Not Authorized"});

    try{
        const user = await User.findOne({_id: userId}).exec();
        if(!user) return res.status(404).json({message: "No user found with this ID"});
        res.status(200).json(user.posts);

    }catch(err){
        res.status(500).json(err.message);
    }
}

module.exports = getHistory;
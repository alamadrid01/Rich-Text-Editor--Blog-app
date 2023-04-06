const User = require("../../model/userSchema");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ChangePassword = async (req, res) => {
    const id = req.params.id;
    const {oldPassword, newPassword} = req.body;

    if(!id || !oldPassword || !newPassword) return res.status(400).json({message: "Id or password is required"});

    // Trim white spaces from the passwords
    const trimOldPassword = oldPassword.trim();
    const trimNewPassword = newPassword.trim();

    // Check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid Id"})

    const user = await User.findOne({_id: id}).exec();
    if(!user) return res.status(404).json({message: "No user found"})

    const checkPassword = await bcrypt.compare(trimOldPassword, user.password);
    if(!checkPassword) return res.status(401).json({message: "Password do not match"});

    // Check if the old password is same as new password
     const checkDuplicatePassword = await bcrypt.compare(
       trimNewPassword,
       user.password
     );
     if (checkDuplicatePassword) {
       return res
         .status(400)
         .json({
           message: "New password cannot be the same as the old password",
         });
     }

    try {
        // hash the password before saving
        const hashPassword = await bcrypt.hash(trimNewPassword, 10);

        user.password = hashPassword;
        await user.save();
        return res.sendStatus(204);
    }catch(err){
        return res.sendStatus(500)
    }
}

module.exports = ChangePassword
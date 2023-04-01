const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

const Register = async (req, res) =>{
    const {fullName, username, email, password} = req.body;
    if(!fullName || !username || !email || !password) return res.status(400).json({message: "incomplete or no parameters"});
    const duplicate = await User.find({email: email});
    if(duplicate) return res.status(409).json({message: "Email already exist"});

    try{   
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = User.create({
            fullName,
            email,
            password: hashPassword,
        })
        res.status(201).json({ success: `New user ${newUser} created`});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {Register};
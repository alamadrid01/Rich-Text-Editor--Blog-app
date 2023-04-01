const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "incomplete or no parameters"})

    try{
        const findUser = await User.findOne({ email: email }).exec();
        if(!findUser) return res.status(404).json({message: `No account found with this ${email}`})
        const match = await bcrypt.compare(password, findUser.password);  
        if(match){
            res.json({"success": `User ${findUser} is logged in`})
        }else{
            res.status(401);
        }
        
    }catch(err){
        res.status(500).json({message: err.message})
    }

}

module.exports = {Login} ;
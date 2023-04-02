const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "incomplete or no parameters"})

    try{
        const findUser = await User.findOne({ email: email }).exec();
        if(!findUser) return res.status(404).json({message: `No account found with this ${email}`})
        const match = await bcrypt.compare(password, findUser.password);  
        if(match){

            // Generate access token
            const accessToken = await jwt.sign(
              { username: findUser.username },
              process.env.ACCESS_TOKEN,
              {expiresIn: '300s'}
            );

            // Generate refresh token
             const refreshToken = await jwt.sign(
              { username: findUser.username },
              process.env.REFRESH_TOKEN,
              {expiresIn: '1d'}
            );

            // Save refresh token to database
            findUser.refreshToken = refreshToken;
            const saveRefreshToken = await findUser.save();
            if(!saveRefreshToken) return res.sendStatus(500)
            
            res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            res.json({ accessToken });
        }else{
            res.status(401).json({message: "Not authorized"});
        }
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {Login} ;
const jwt = require("jsonwebtoken");
require("dotenv").config();


const Verify = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token);

    // verify the jwt token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.user = decoded.username;
        next();
    })
}

module.exports = Verify
const Payment = async (req, res) => {
    const {username, password} = req.body;

    console.log("username", username);
    console.log("password", password);

    if(!username || !password) return res.sendStatus(400);

    res.sendStatus(200);
}

module.exports = Payment
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
const port = 5001


app.get('/', (req, res) =>{
    res.json({message: 'welcome to wrong parameters'})
})

app.listen(port, () =>{
    console.log('server is running')
})

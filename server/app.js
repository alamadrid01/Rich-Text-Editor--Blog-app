const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const connect = require("./lib/connectDB")
require('dotenv').config();
const blogRouter = require("./routes/blog")

const app = express();

const port = process.env.PORT || 5001

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", blogRouter)
app.get('/', (req, res) =>{
    res.json({message: 'welcome to wrong parameters'})
})


const startServer = async() => {
    try {
        connect();
      console.log('Connected to MongoDB database');
      app.listen(port, () =>{
        console.log(`server is running on ${port}`)
    })
    } catch (err) {
      console.error(err);
    }
  }
  
  startServer();

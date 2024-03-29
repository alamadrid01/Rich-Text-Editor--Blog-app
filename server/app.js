const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const connect = require("./lib/connectDB")
require('dotenv').config();
const blogRouter = require("./routes/blog");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const updateRoute = require("./routes/updateProfile");
const changePasswordRoute = require("./routes/changePassword");
const PaymentRoute = require("./routes/payment");
const ProfileRoute = require("./routes/getProfile");
const HistoryRoute = require("./routes/getHistory");



const app = express();

const port = process.env.PORT || 5001

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", blogRouter)
app.use("/api", ProfileRoute);
app.use("/api", loginRoute)
app.use("/api", updateRoute);
app.use("/api", HistoryRoute);
app.use("/api", PaymentRoute);
app.use("/api", registerRoute)
app.use("/api", changePasswordRoute);
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

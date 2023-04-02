import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss";
import sign from "../../assets/login.jpg";
import Navbar from "../../components/Navbar";
import axios from "axios";

function Register() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const regData = new FormData();
      regData.append("email", email);
      regData.append("username", username);
      regData.append("fullName", fName);
      regData.append("password", password);

      const Response = await axios.post(
        "https://blog-app-v8b8.onrender.com/api/register",
        regData
      );
      console.log(Response.data)

    }catch(err){
      console.error(err.message);
    }
   
  };

  return (
    <div className="login mt-3 ">
      <Navbar />
      <main>
        <div className="left">
          <img src={sign} alt="Sign in" />
        </div>
        <div className="right">
          <h1 className="text-center">Welcome!</h1>
          <p className="text-center"> Provide your details for registration.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="w-[100%] p-4 "
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[100%] p-4 "
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] p-4 "
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            <div className="flex justify-between mt-4 w-[80%]">
              {" "}
              <p onClick={() => Navigate("/login")}>Sign in</p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;

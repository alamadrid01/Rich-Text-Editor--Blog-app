import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss";
import sign from "../../assets/login.jpg";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [resError, setResonseError] = useState("")

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !username || !fName || !password) return setError(true);

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
      if(err.response.status === 409){
        setResonseError(err.response.data.message);
      }else{
        toast.error("Registration failed")
      }
      
    }
   
  };

  return (
    <div className="login mt-3 ">
      <ToastContainer />
      <Navbar />
      <main>
        <div className="left">
          <img src={sign} alt="Sign in" />
        </div>
        <div className="right">
          <h1 className="text-center">Welcome!</h1>
          <p className="text-center"> Provide your details for registration.</p>
          <form onSubmit={handleSubmit}>
            <p className="error text-center">{resError}</p>
            <input
              type="text"
              placeholder="Full Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className={`w-[100%] p-4 border border-1 ${
                error && !fName ? "border-red-500 " : "border-[#e5e5e5]"
              }`}
            />
            {error && !fName ? (
              <small className="text-red-500">Full name is required</small>
            ) : (
              <small></small>
            )}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-[100%] p-4 border border-1 ${
                error && !username ? "border-red-500 " : "border-[#e5e5e5]"
              }`}
            />
            {error && !username ? (
              <small className="text-red-500">Username is required</small>
            ) : (
              <small></small>
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[100%] p-4 border border-1 ${
                error && !email ? "border-red-500 " : "border-[#e5e5e5]"
              }`}
            />
            {error && !email ? (
              <small className="text-red-500">Email is required</small>
            ) : (
              <small></small>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[100%] p-4 border border-1 ${
                error && !password ? "border-red-500 " : "border-[#e5e5e5]"
              }`}
            />
            {error && !password ? (
              <small className="text-red-500">Password is required</small>
            ) : (
              <small></small>
            )}
            <button type="submit">Register</button>

            <div className="flex justify-center items-center">
              <div className="flex justify-between items-center mt-4 w-[80%]">
                {" "}
                <p onClick={() => Navigate("/login")}>Sign in</p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;

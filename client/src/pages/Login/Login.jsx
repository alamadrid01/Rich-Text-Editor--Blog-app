import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss"
import sign from "../../assets/login.jpg";
import Navbar from "../../components/Navbar";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleLogin = async () =>{

      if(email === "" || password === "") return setError(true)

      try{
        const bodyData = new FormData();
        bodyData.append("email", email);
        bodyData.append("password", password);

        const Response = await axios.post(
          "https://blog-app-v8b8.onrender.com/api/login",
          bodyData
        );
        console.log(Response.data);
        setError(false);
        toast.success("Login successful")
        setTimeout(() => {
          Navigate("/profile");
        }, 1500)
    
      }catch(err){
        console.error(err.message)
        if(err.status === 500){
          toast.error("Unable to process your request")
        }else if(err.status === 401){
          toast.error("Unauthorized")
        }else if (err.status === 404) {
          toast.error("Incorrect username or password")
        }else{
          toast.error("login failed");
        }
      }
    }
      handleLogin();
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
          <p className="text-center"> Enter details to login.</p>
          <form onSubmit={handleSubmit}>
            {/* {error && <p className="error"> Incorrect username or password</p>} */}
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
            <button type="submit">Login</button>
            <div className="flex justify-center items-center">
              <div className="flex justify-between mt-4 w-[80%]">
                {" "}
                <p
                  onClick={() =>
                    alert("chill dude, i am not done with the application")
                  }
                >
                  Forgot password?
                </p>
                <p onClick={() => Navigate("/register")}>Sign up</p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;

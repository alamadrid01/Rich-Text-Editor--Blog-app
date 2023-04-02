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
      try{
        const bodyData = new FormData();
        bodyData.append("email", email);
        bodyData.append("password", password);

        const Response = await axios.post("http://localhost:5001/api/login", bodyData);
        toast.success(Response.data);
        console.log(Response.data);
        setError(false);
      }catch(err){
        console.error(err.message)
        if(err.status === 500){
          toast.error("Unable to process your request")
        }else if(err.status === 401){
          toast.error("Unauthorized")
        }else if (err.status === 404) {
          toast.error("Incorrect username or password")
          setError(true);
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
            {error && <p className="error"> Incorrect username or password</p>}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[100%] p-4 ${
                error && "outline outline-bg-red-600"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[100%] p-4 ${
                error && "outline outline-bg-red-700"
              }`}
            />
            <button type="submit">Login</button>
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
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;

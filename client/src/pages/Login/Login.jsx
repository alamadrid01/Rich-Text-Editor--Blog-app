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
  const [resError, setResonseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleLogin = async () =>{
      setIsLoading(true);

      if(email === "" || password === ""){
         setError(true);
         setIsLoading(false);
         return ;
      }

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
        setIsLoading(false);
        toast.success("Login successful")
        setTimeout(() => {
          Navigate("/profile");
        }, 1500)
    
      }catch(err){
        setIsLoading(false);
       if (err.response.status === 404) {
         setResonseError(err.response.data.message);
       } else if(err.response.status === 401){
          setResonseError("Wrong username or password")
       }else {
         toast.error("Registration failed");
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
            <p className="error text-center">{resError}</p>
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
            {isLoading ? (
              <button disabled className="h-5 flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-blue-600 fill-gray-200"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </button>
            ) : (
              <button type="submit">Login</button>
            )}

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

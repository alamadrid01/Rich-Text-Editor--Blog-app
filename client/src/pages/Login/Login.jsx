import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss"
import sign from "../../assets/login.jpg";
import Navbar from "../../components/Navbar";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      email,
      password,
    };
    localStorage.setItem("form", JSON.stringify(Data));
    if (email === "admin" && password === "admin") {
      Navigate("/dashboard");
    }
  };

  useEffect(() => {
    let storedData = localStorage.getItem("form");
    if (!storedData) return;
    let result = JSON.parse(storedData);
    setEmail(result.email);
    setPassword(result.password);
  }, []);

  return (
    <div className="login mt-3 ">
      <Navbar />
      <main>
        <div className="left">
          <img src={sign} alt="Sign in" />
        </div>
        <div className="right">
          <h1>Welcome!</h1>
          <p> Enter details to login.</p>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <div className="flex justify-between mt-4 w-[80%]">
              {" "}
              <p>Forgot password?</p>
              <p>Sign up</p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;

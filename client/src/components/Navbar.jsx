import React from "react";
import { useNavigate } from "react-router-dom"
import Profile from "../assets/profile.svg"

function Navbar() {
  const Navigate = useNavigate()
  return (
    <ul className="flex justify-between py-5 top-0 ">
      <li className="text-2xl font-bold">
        <button onClick={() => Navigate("/")}> Aloy</button>
      </li>
      <li className="text-2xl font-bold">
        <button onClick={() => Navigate("/login")}>
          <img src={Profile} alt="profile" />{" "}
        </button>
      </li>
    </ul>
  );
}

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom"

function Navbar() {
  const Navigate = useNavigate()
  return (
    <ul onClick={() => Navigate("/")} className="flex justify-between py-5 top-0 absolute">
      <li className="text-2xl font-bold">
        <button> Aloy</button>
      </li>
    </ul>
  );
}

export default Navbar;

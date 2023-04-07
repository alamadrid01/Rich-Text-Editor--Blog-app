import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import Profile from "../assets/profile.svg"

function Navbar() {
  const locate = useLocation();
  const Navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [image, setImage] = useState("");
  const [imageDisplay, setImageDisplay] = useState(false);

  const { pathname } = locate;
  

 useEffect(() => {
   if (pathname === "/register" || pathname === "/login") {
     setDisplay(true);
   }
   const user = JSON.parse(localStorage.getItem("aloy-user"));

   if(user){
    setImageDisplay(true);
    setImage(user.avatar);
   }
 }, [pathname])

  return (
    <ul className="flex justify-between py-5 top-0 ">
      <li className="text-2xl font-bold">
        <button onClick={() => Navigate("/")}> Aloy</button>
      </li>
      {display ? null : (
        <li className="text-2xl font-bold">
          <button onClick={() => Navigate("/login")}>
            {
              imageDisplay ? <img src={image} alt="" className="w-[32px] h-[32px] rounded-full " /> : <img src={Profile} alt="profile" />
            }
          </button>
        </li>
      )}
    </ul>
  );
}

export default Navbar;

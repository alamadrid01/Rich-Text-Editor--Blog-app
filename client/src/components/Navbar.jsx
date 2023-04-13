import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import Profile from "../assets/profile.svg"
import Notification from "../assets/not.svg";

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
    <ul className="flex justify-between py-5 mt-3 max-w-[1440px]">
      <li className="text-2xl font-bold">
        <button onClick={() => Navigate("/")}> Aloy</button>
      </li>
      {display ? null : (
        <li className="text-2xl font-bold">
          <button>
            {imageDisplay ? (
              <div className="flex gap-5 items-center justify-center">
                <div className="relative">
                  <h2 className="absolute bg-red-700 text-white w-[25px] py-[0px] text-center h-[25px] rounded-full top-[-10px] left-[-10px] text-[12px]">
                    2
                  </h2>
                  <img src={Notification} alt="profile" />
                </div>
                <img
                  src={image}
                  alt=""
                  className="w-[32px] h-[32px] rounded-full"
                  onClick={() => Navigate("/profile")}
                  role="button"
                />
              </div>
            ) : (
              <img
                src={Profile}
                alt="profile"
                onClick={() => Navigate("/login")}
                role="button"
              />
            )}
          </button>
        </li>
      )}
    </ul>
  );
}

export default Navbar;

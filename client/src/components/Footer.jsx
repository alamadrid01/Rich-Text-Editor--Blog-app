import React from "react";
import Create from "../assets/create.svg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const Navigate = useNavigate();
  return (
    <>
      <button
        className="fixed bottom-[65px] right-[65px]"
        onClick={() => Navigate("/create-blog")}
      >
        <img className="w-[50px] h-[50px]" src={Create} alt="create icon" />
      </button>
      <div className="border-t w-full p-3 border-black text-center bottom-[-100px] relative">
        <p>Made by Alamadrid</p>
      </div>
    </>
  );
}

export default Footer;

import React from "react";
import Create from "../assets/created.svg";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const Navigate = useNavigate();
  const [show, setShow] = React.useState(true);
  
  const location = useLocation();
  const currentUrl = location.pathname;
  
  React.useEffect(() => {
    if(currentUrl === "/create-blog" || currentUrl === "/profile"){
      setShow(false)
    }else{
      setShow(true)
    }
  }, [currentUrl])

  return (
    <>
      {
        show ? <button
        className="fixed bottom-[65px] right-[65px]"
        onClick={() => Navigate("/create-blog")}
      > 
        <img className="w-[55px] h-[55px]" src={Create} alt="create icon" />
      </button> : ""
      }
      <div className="border-t w-full p-3 border-black text-center bottom-[-100px] relative">
        <p>Made by Alamadrid</p>
      </div>
    </>
  );
}

export default Footer;

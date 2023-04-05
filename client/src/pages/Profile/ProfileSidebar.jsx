import { useNavigate, useLocation } from "react-router-dom";
import Message from "../../assets/message.svg";
import profile from "../../assets/profile.svg";
import Edit from "../../assets/edited.svg";
import Logout from "../../assets/logout.svg";
import { useEffect, useState } from "react";


const ProfileSidebar = ({value}) => {
    const [color, setColor] = useState(false);
    const [secColor, setSecColor] = useState(false);
    const Navigate = useNavigate();
    const locate = useLocation();

    const {pathname} = locate;

    useEffect(() => {
        if (pathname === "/profile/settings") {
          setColor(true);
          setSecColor(false)
        }else if (pathname === "/profile/history") {
            setSecColor(true);
            setColor(false);
        }
    }, [pathname])

  return (
    <div className="flex flex-col w-[100%] md:w-[25%]">
      <section className="w-[100%] border border-1 border-gray-200 bg-white rounded-lg mt-5 py-5 px-2">
        <h2 className="px-3 text-2xl text-[#262630] font-bold">{value}</h2>
      </section>
      <section className="w-[100%] border border-1 border-gray-200 bg-white rounded-lg mt-5 py-4 px-2">
        <div
          className="px-3 flex items-center gap-3 cursor-pointer"
          role="button"
          onClick={() => Navigate("/profile")}
        >
          <img src={profile} alt="" className="w-[32px] h-[32px]" />
          <h3
            className={`font-bold text-[14px] ${
             !secColor && color  ? "text-gray-500" : "text-blue-500"
            }`}
          >
            PROFILE
          </h3>
        </div>
        <div
          className="mt-4 px-3 flex items-center gap-3 cursor-pointer"
          role="button"
          onClick={() => Navigate("/profile/history")}
        >
          <img src={Message} alt="" className="w-[32px] h-[32px]" />
          <h3
            className={`font-bold text-[14px] ${
              secColor ? "text-blue-500" : "text-gray-500"
            }`}
          >
            MANAGE BLOGS
          </h3>
        </div>
        <div
          className="mt-4 px-3 flex items-center gap-3 cursor-pointer"
          role="button"
          onClick={() => Navigate("/profile/settings")}
        >
          <img src={Edit} alt="" className="w-[32px] h-[32px]" />
          <h3
            className={`font-bold text-[14px] ${
              color ? "text-blue-500" : "text-gray-500"
            }`}
          >
            ACCOUNT
          </h3>
        </div>
        <div
          className="mt-4 px-3 flex items-center gap-3 cursor-pointer"
          role="button"
        >
          <img src={Logout} alt="" className="w-[32px] h-[32px]" />
          <h3 className="font-bold text-[14px] text-gray-500">LOGOUT</h3>
        </div>
      </section>
    </div>
  );
};

export default ProfileSidebar;

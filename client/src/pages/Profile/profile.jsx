import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Message from "../../assets/message.svg"
import profile from "../../assets/profile.svg";
import Edit from "../../assets/edited.svg";
import Edited from "../../assets/edit.svg"
import Logout from "../../assets/logout.svg"
import BioModal from "../../components/Modal/bioModal";
import { useState } from "react";
import PasswordModal from "../../components/Modal/passwordModal";

const Profile = () => {
    const Navigate = useNavigate();
    const [showBio, setShowBio] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleModalClose = () => {
      setShowBio(false);
    };

     const handleModalClos = () => {
       setShowPassword(false);
     };
  return (
    <>
      {showBio && <BioModal onClose={handleModalClose} />}
      {showPassword && <PasswordModal onClose={handleModalClos} />}
      <section className="px-0 lg-px-5 xl:max-w-6xl xl:mx-auto pb-20">
        <Navbar />
        <main>
          <div className="head flex justify-between items-center mt-5">
            <h1 className="text-4xl text-[#262630]">Profile</h1>
            <button
              className="bg-black text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300"
              onClick={() => Navigate("/create-blog")}
            >
              Create a blog
            </button>
          </div>
          <div className="about flex flex-col gap-3 mt-5">
            <section className="bg-white rounded-md mt-5 py-5 px-2">
              <h2 className=" text-2xl text-[#262630]">My Account</h2>
              <div className="flex gap-5 mt-10 px-4">
                <div className="p-4 bg-gray-300 rounded-full">
                  <img src={profile} alt="" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[20px] font-bold">Adebayo</div>
                  <div className="text-[15px]">Full Name</div>
                </div>
              </div>
              <div className="flex gap-5 mt-6 px-4">
                <div className="p-4 bg-gray-300 rounded-full">
                  <img src={Message} alt="" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[20px] font-bold">
                    adebayoalameen@gmail.com
                  </div>
                  <div className="text-[15px]">Email Address</div>
                </div>
              </div>
              <div className="flex gap-5 mt-8 px-[40px] relative">
                <div className="flex flex-col gap-3">
                  <div className="text-[20px] font-bold">Bio</div>
                  <div className="text-[15px]">
                    {" "}
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </div>
                  <div
                    className=" absolute left-[8%] top-1 cursor-pointer"
                    onClick={() => setShowBio(true)}
                  >
                    <img src={Edit} alt="" className="w-[19px] h-[19px]" />
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-md mt-5 py-5 px-2">
              <h2 className=" text-2xl text-[#262630]">History</h2>
              <div className="flex justify-between items-center px-5 mt-10">
                <div className="flex gap-3 items-center">
                  <img
                    class
                    src={profile}
                    alt=""
                    className="w-[32px] h-[32px] rounded-full object-cover"
                  />
                  <h3 className="text-2xl text-gray-500">My journey in tech</h3>
                </div>
                <div className="flex gap-5">
                  <button
                    className="bg-white border border-1 border-green-300 text-green-300 px-3 py-2 rounded-md hover:opacity-75 transition-all duration-300"
                    onClick={() => Navigate("/create-blog")}
                  >
                    Edit post
                  </button>
                  <button
                    className="bg-white border border-1 border-red-300 text-red-300 px-3 py-2 rounded-md hover:opacity-75 transition-all duration-300"
                    onClick={() => Navigate("/create-blog")}
                  >
                    Delete post
                  </button>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-md mt-5 py-5 px-2">
              <h2 className=" text-2xl text-[#262630]">Account Settings</h2>
              <div className="flex flex-col gap-3 px-5 mt-10">
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => setShowPassword(true)}
                >
                  <div className="p-2 bg-gray-300 rounded-full">
                    <img src={Edited} alt="" className="w-[20px] h-[20px]" />
                  </div>
                  <div className="text-[18px] font-bold">Change Password</div>
                </div>
                <div className="flex gap-3 items-center cursor-pointer ">
                  <div className="p-2 bg-gray-300 rounded-full">
                    <img src={Logout} alt="" className="w-[20px] h-[20px]" />
                  </div>
                  <div className="text-[18px] font-bold">Logout</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </section>
    </>
  );
};

export default Profile;

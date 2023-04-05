import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Message from "../../assets/message.svg";
import profile from "../../assets/profile.svg";
import Edit from "../../assets/edited.svg";
import Edited from "../../assets/edit.svg";
import Logout from "../../assets/logout.svg";
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
      <section className="px-0 lg-px-5 xl:max-w-10xl xl:mx-auto pb-20">
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
            <main className=" flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-[100%] md:w-[25%]">
                <section className="w-[100%] border border-1 border-gray-200 bg-white rounded-lg mt-5 py-5 px-2">
                  <h2 className="px-3 text-2xl text-[#262630] font-bold">
                    User Settings
                  </h2>
                </section>
                <section className="w-[100%] border border-1 border-gray-200 bg-white rounded-lg mt-5 py-4 px-2">
                  <div
                    className="px-3 flex items-center gap-3 cursor-pointer"
                    role="button"
                  >
                    <img src={profile} alt="" className="w-[32px] h-[32px]" />
                    <h3 className="font-bold text-blue-500">PROFILE</h3>
                  </div>
                  <div
                    className="mt-4 px-3 flex items-center gap-3 cursor-pointer"
                    role="button"
                  >
                    <img src={Message} alt="" className="w-[32px] h-[32px]" />
                    <h3 className="font-bold text-gray-500">HISTORY</h3>
                  </div>
                  <div
                    className="mt-4 px-3 flex items-center gap-3 cursor-pointer"
                    role="button"
                  >
                    <img src={Logout} alt="" className="w-[32px] h-[32px]" />
                    <h3 className="font-bold text-gray-500">LOGOUT</h3>
                  </div>
                </section>
              </div>
              <section className="w-[100%] md:w-[75%] bg-white rounded-lg border border-1 border-gray-200 mt-5 py-7 px-5">
                <div className="flex flex-col gap-6 md:flex-row justify-between">
                  <div className="w-[100%]">
                    <h2 className="text-[18px] font-bold">Basic Info</h2>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="full-name"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="full-name"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="full-name"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Profile Photo
                      </label>
                      <img
                        src={profile}
                        alt=""
                        className="rounded-full object-cover w-[200px] h-[200px]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="full-name"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <h2 className="text-[18px] mt-10 font-bold">About You</h2>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="bio"
                        className="text-[14px] font-bold text-gray-500 "
                      >
                        Profile Bio (About you)
                      </label>
                      <textarea
                        name="bio"
                        id="bio"
                        cols="25"
                        rows="7"
                        // value={bio}
                        // onChange={(e) => setBio(e.target.value)}
                        placeholder="I am programmer from planet ..."
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc] "
                      ></textarea>
                    </div>
                    <div className="flex flex-col gap-3 mt-6">
                      <label
                        htmlFor="available"
                        className="text-[14px] font-bold text-gray-500 "
                      >
                        Available for
                      </label>
                      <textarea
                        name="available"
                        id="available"
                        cols="25"
                        rows="7"
                        // value={bio}
                        // onChange={(e) => setBio(e.target.value)}
                        placeholder="I am availabe for mentoring ..."
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc] "
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-[100%]">
                    <h2 className="text-[18px] font-bold">Social</h2>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="twitter"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Twitter Profile
                      </label>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="instagram"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Instagram Profile
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="github"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        GitHub Profile
                      </label>
                      <input
                        type="text"
                        name="github"
                        id="github"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="stack"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        StackOverflow Profile
                      </label>
                      <input
                        type="text"
                        name="stack"
                        id="stack"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="facebook"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Facebook Profile
                      </label>
                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="website"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        Website URL
                      </label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="linked"
                        className="text-[14px] font-bold text-gray-500"
                      >
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        name="linked"
                        id="linked"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                      <label
                        htmlFor="email"
                        className="text-[14px] font-bold text-gray-500 mb-[-10px]"
                      >
                        Email Address
                      </label>
                      <p className="italic text-[16px] text-gray-600 mb-2">
                        Changing your email address might break your OAuth
                        sign-in. Please use your username to sign-in if you
                        encounter such an issue.
                      </p>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus focus:outline-[#39cdcc]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </main>
      </section>
    </>
  );
};

export default Profile;

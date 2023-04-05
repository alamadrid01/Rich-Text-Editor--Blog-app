import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PasswordModal from "../../components/Modal/passwordModal";

const AccountSetting = () => {
  const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

  const handleModalClos = () => {
    setShowPassword(false);
  };

  return (
    <>
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
              <ProfileSidebar value={"Account Setting"} />
              <section className="w-[100%] md:w-[75%] bg-white rounded-lg border border-1 border-gray-200 mt-5 py-7 px-5">
                <div className="">
                  <h2 className="text-[18px] font-bold text-gray-600">
                    Change password
                  </h2>
                  <p className="mt-4 ">
                    You are about to change the password to your account.
                  </p>
                  <button
                    className="mt-3 bg-[#2ab2b1] text-white px-3 md:px-5 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
                    onClick={() => setShowPassword(true)}
                  >
                    Change your passworrd
                  </button>
                </div>
                <div className="mt-10">
                  <h2 className="text-[18px] font-bold text-red-600">
                    Delete Account
                  </h2>
                  <p className="mt-4 ">
                    Your personal data will be deleted permanently when you
                    delete your account on Hashnode. This action is
                    irreversible.
                  </p>
                  <button
                    className="mt-6 bg-red-600 text-white px-3 md:px-5 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
                    onClick={() => alert("calm!, still working on it")}
                  >
                    Delete your account
                  </button>
                </div>
              </section>
            </main>
          </div>
        </main>
      </section>
    </>
  );
};

export default AccountSetting;

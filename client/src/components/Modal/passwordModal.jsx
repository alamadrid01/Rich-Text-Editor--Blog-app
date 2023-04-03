import React, { useState } from "react";

const PasswordModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <main
        className=" z-10 fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center "
        onClick={handleClickOutside}
      >
        <div
          className=" flex flex-col bg-white  rounded-md px-8 py-4 w-3/5 sm:w-4/5 lg:w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[20px] font-bold text-green-800 text-center">
            Edit Password
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-3">
            <input
              type="password"
              placeholder="Old Password"
              name=""
              id=""
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            <input
              type="password"
              placeholder="New Password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name=""
              id=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            <button
              type="submit"
              className="bg-green-400 text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default PasswordModal;

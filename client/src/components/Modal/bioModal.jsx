import React, { useState } from "react";

const BioModal = ({ onClose }) => {
  const [bio, setBio] = useState("");

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
          className=" flex flex-col bg-white  rounded-md px-8 py-4 w-3/5 sm:w-3/5 lg:w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[20px] font-bold text-green-800 text-center">
            Edit Bio
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-3">
            <textarea
              name="bio"
              id="bio"
              cols="25"
              rows="9"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Type your bio here ..."
              className="focus focus:outline-none"
            ></textarea>
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

export default BioModal;

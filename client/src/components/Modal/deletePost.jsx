import axios from "axios";
import React from "react";

const DeletePost = ({ onClose, postId, onDeleteSuccess }) => {

  const mainData = JSON.parse(localStorage.getItem("aloy-user"));
  const userId = mainData.userId;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try{
      const deleteBlog = await axios.delete(
        `https://blog-app-v8b8.onrender.com/api/blog/${userId}/${postId}`
      );
      console.log(deleteBlog);
        onClose();
        onDeleteSuccess();
    }catch(err){
      console.error(err);
    }
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
          className=" flex flex-col bg-white  rounded-md px-8 py-4 w-5/6 sm:w-3/5 lg:w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[20px] font-bold text-red-600 text-center">
            Delete blog
          </div>
          <p className="mt-4 ">
            This blog will be permanently deleted on Aloy. This action is
            irreversible.
          </p>
          <button
            className="mt-6 bg-red-600 text-white px-3 md:px-5 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
            onClick={submitHandler}
          >
            Delete blog
          </button>
        </div>
      </main>
    </>
  );
};

export default DeletePost;

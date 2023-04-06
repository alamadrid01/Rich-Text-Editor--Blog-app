import React, { useState } from 'react'
import ProfileSidebar from "./ProfileSidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import profile from "../../assets/profile.svg";
import DeletePost from '../../components/Modal/deletePost';



const BlogHistory = () => {
    const Navigate = useNavigate();
    const [displayModal, setDisplayModal] = useState(false);
    console.log(displayModal);

    const handleClose = () => {
      setDisplayModal(false)
    }



  return (
    <>
      {displayModal && <DeletePost onClose={handleClose} />}
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
                <section className="bg-white rounded-md mt-5 py-5 px-2">
                  <h2 className=" text-2xl text-[#262630]">History</h2>
                  <div className="flex justify-between items-center px-5 mt-10">
                    <div className="flex gap-3 items-center">
                      <img
                        src={profile}
                        alt=""
                        className="w-[32px] h-[32px] rounded-full object-cover"
                      />
                      <h3 className="text-2xl text-gray-500">
                        My journey in tech
                      </h3>
                    </div>
                    <div className="flex gap-5">
                      <button
                        className="bg-white border border-1 border-green-500 text-green-500 px-3 py-2 rounded-md  hover:bg-green-400 hover:border-none hover:text-white transition-all duration-300"
                        onClick={() => Navigate("/create-blog")}
                      >
                        Edit post
                      </button>
                      <button
                        className="bg-white border border-1 border-red-500 text-red-500 px-3 py-2 rounded-md  hover:bg-red-400 hover:border-none hover:text-white transition-all duration-300"
                        onClick={() => setDisplayModal(true)}
                      >
                        Delete post
                      </button>
                    </div>
                  </div>
                </section>
              </section>
            </main>
          </div>
        </main>
      </section>
    </>
  );
}

export default BlogHistory



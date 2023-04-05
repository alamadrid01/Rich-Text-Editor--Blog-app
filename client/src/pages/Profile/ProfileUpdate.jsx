import React from 'react'
import profile from "../../assets/profile.svg";
import ProfileSidebar from './ProfileSidebar';

const ProfileUpdate = () => {
  return (
    <div>
      <main className=" flex flex-col md:flex-row gap-4">
        <ProfileSidebar value={"User Setting"}/>
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
                  Changing your email address might break your OAuth sign-in.
                  Please use your username to sign-in if you encounter such an
                  issue.
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
          <button
            className="mt-6 bg-black text-white px-3 md:px-6 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
            onClick={() => alert("calm!, still working on it")}
          >
            Update
          </button>
        </section>
      </main>
    </div>
  );
}

export default ProfileUpdate
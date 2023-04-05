 <section className="bg-white rounded-md mt-5 py-5 px-2">
              <h2 className=" text-2xl text-[#262630]">History</h2>
              <div className="flex justify-between items-center px-5 mt-10">
                <div className="flex gap-3 items-center">
                  <img
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
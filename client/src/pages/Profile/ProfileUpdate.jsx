import React, { useEffect, useState } from 'react'
import profile from "../../assets/profile.svg";
import ProfileSidebar from './ProfileSidebar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ProfileUpdate = () => {
  const [image, setImage] = useState(profile);
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("");
  const [availabe, setAvailable] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("")
  const [twitter, setTwitter] = useState("");
  const [link, setLinked] = useState("");
  const [instagram, setInstagram] = useState("");
  const [stack, setStack] = useState("");
  const [git, setGit] = useState("")
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);



  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("aloy-user"));
    setId(data.userId)
    setFullName(data.name);
    setUsername(data.username);
    setImage(data.avatar);
    setBio(data.bio)
    setEmail(data.email)
    setAvailable(data.availabe);

  data.social.forEach((link) => {
    setFacebook(link.facebook);
    setTwitter(link.twitter);
    setInstagram(link.instagram);
    setStack(link.stack);
    setWebsite(link.website);
    setGit(link.github);
  });

  }, [fullData])

  const fetchUser = async () => {
    try{
      const Response = await axios.get(
        `https://blog-app-v8b8.onrender.com/api/profile/${userId}`
      );
      localStorage.setItem("aloy-user", JSON.stringify(Response.data));
      setFullData(Response.data)
      
    }catch(err){
      toast.error("Unabe to fetch user data")
    }
  }



   const handleImageChange = (e) => {
      setAvatar(e.target.files[0]);
     if (e.target.files && e.target.files[0]) {
       setImage(URL.createObjectURL(e.target.files[0]));
     }
   };

   const handleUpdate = async () => {
    setIsLoading(true);

      try{
        const updateData = new FormData();
        updateData.append("fName", fullName);
        updateData.append("username", username);
        updateData.append("email", email);
        updateData.append("bio", bio);
        updateData.append("available", availabe);
        updateData.append("location", location);
        updateData.append("twitter", twitter);
        updateData.append("instagram", instagram);
        updateData.append("github", git);
        updateData.append("stack", stack);
        updateData.append("facebook", facebook);
        updateData.append("website", website);
        updateData.append("link", link);
        updateData.append("image", avatar)

        const uploadData = await axios.put(
          `https://blog-app-v8b8.onrender.com/api/update/${userId}`,
          updateData
        );
        setIsLoading(false);
        fetchUser();
        if(uploadData.status === 204){
          toast.success("Profile updated successfully")
        }
      }catch(err){
        console.error(err)
        setIsLoading(false);
        toast.error("Error updating your profile");
      }
   }

  return (
    <div>
      <ToastContainer />
      <main className=" flex flex-col md:flex-row gap-4">
        <ProfileSidebar value={"User Setting"} />
        <section className="w-[100%] md:w-[75%] bg-white rounded-lg border border-1 border-gray-200 mt-5 py-7 px-5">
          <div className="flex flex-col gap-6 md:flex-row justify-between">
            <div className="w-[100%]">
              <h2 className="text-[18px] font-bold">Basic Info</h2>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="full-name"
                  className="text-[13px] font-bold text-violet-500 "
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="full-name"
                  value={fullName}
                  id="full-name"
                  className="  outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="full-name"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={"@" + username}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="profile-photo"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Profile Photo
                </label>
                <input
                  type="file"
                  className="block w-full text-sm ttext-violet-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-[1.5px] file:border-violet-500
              file:text-md file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
                  id="profile-photo"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <img
                  id="preview-image"
                  src={image}
                  alt=""
                  className="rounded-full mt-4 object-cover w-[200px] h-[200px] "
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="full-name"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Abuja, Nigeria"
                  value={location}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <h2 className="text-[18px] mt-10 font-bold">About You</h2>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="bio"
                  className="text-[13px] font-bold text-violet-500 "
                >
                  Profile Bio (About you)
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  cols="25"
                  rows="7"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="I am programmer from planet ..."
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300 "
                ></textarea>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <label
                  htmlFor="available"
                  className="text-[13px] font-bold text-violet-500 "
                >
                  Available for
                </label>
                <textarea
                  name="available"
                  id="available"
                  cols="25"
                  rows="7"
                  value={availabe}
                  onChange={(e) => setAvailable(e.target.value)}
                  placeholder="I am availabe for mentoring ..."
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300 "
                ></textarea>
              </div>
            </div>
            <div className="w-[100%]">
              <h2 className="text-[18px] font-bold">Social</h2>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="twitter"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Twitter Profile
                </label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  placeholder="https://twitter.com/AdebayoAlameen"
                  value={twitter}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="instagram"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Instagram Profile
                </label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="https://www.instagram.com/alamadrid_d"
                  value={instagram}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="github"
                  className="text-[13px] font-bold text-violet-500"
                >
                  GitHub Profile
                </label>
                <input
                  type="text"
                  name="github"
                  id="github"
                  placeholder="https://www.github.com/alamadrid"
                  value={git}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setGit(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="stack"
                  className="text-[13px] font-bold text-violet-500"
                >
                  StackOverflow Profile
                </label>
                <input
                  type="text"
                  name="stack"
                  id="stack"
                  value={stack}
                  placeholder="https://www.stackoverflow.com/example"
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setStack(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="facebook"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Facebook Profile
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="https://www.facebook.com/example"
                  value={facebook}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="website"
                  className="text-[13px] font-bold text-violet-500"
                >
                  Website URL
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="https://www.me.com"
                  value={website}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="linked"
                  className="text-[13px] font-bold text-violet-500"
                >
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  name="linked"
                  id="linked"
                  placeholder="https://www.linkedIn.com/example"
                  value={link}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                  onChange={(e) => setLinked(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  htmlFor="email"
                  className="text-[13px] font-bold text-violet-500 mb-[-10px]"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" outline outline-1 outline-gray-200 px-3 py-4 rounded-md focus bg-violet-50 focus:bg-white focus:outline-violet-300"
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <button
              disabled
              className="h-10 flex justify-center items-center mt-6 bg-black text-white md:px-10 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white-600 fill-gray-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </button>
          ) : (
            <button
              className="mt-6 bg-black text-white px-3 md:px-6 px-6 py-3 rounded-lg hover:opacity-75 transition-all duration-300"
              onClick={handleUpdate}
              type="submit"
            >
              Update
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProfileUpdate
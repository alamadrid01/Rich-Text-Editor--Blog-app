import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProfileUpdate from "./ProfileUpdate";

const Profile = () => {
  const Navigate = useNavigate();
  
  return (
    <>
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
           <ProfileUpdate />
          </div>
        </main>
      </section>
    </>
  );
};

export default Profile;

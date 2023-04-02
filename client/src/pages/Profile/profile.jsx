import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Profile = () => {
    const Navigate = useNavigate();
  return (
    <section className="px-0 lg-px-5 xl:max-w-6xl xl:mx-auto pb-20">
      <Navbar />
      <main>
        <div className="head flex justify-between items-center mt-5">
          <h1 className="text-4xl text-[#262630]">Profile</h1>
          <button className="bg-black text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300" onClick={() => Navigate("/create-blog")}>
            Create a blog
          </button>
        </div>
        <div className="about">
          <section className="bg-white rounded-md mt-5 py-5 px-2">
            <h2 className=" text-3xl text-[#262630]">My Account</h2>
          </section>
        </div>
      </main>
    </section>
  );
};

export default Profile;

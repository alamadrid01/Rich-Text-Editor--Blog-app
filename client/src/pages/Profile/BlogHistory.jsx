import React, { useEffect, useState } from 'react'
import ProfileSidebar from "./ProfileSidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DeletePost from '../../components/Modal/deletePost';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BlogHistory = () => {
    const Navigate = useNavigate();
    const [displayModal, setDisplayModal] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [blogId, setBlogId] = useState("");
    const [isLoading, setIsloading] = useState(true);
    const [noHistory, setNoHistory] = useState("")

    const handleClose = () => {
      setDisplayModal(false)
    }

    const mainData = JSON.parse(localStorage.getItem("aloy-user"));
    const userId = mainData.userId;

     const getHistory = async () => {
       try {
         const response = await axios.get(
           `https://blog-app-v8b8.onrender.com/api/profile-history/${userId}`
         );
         const blogId = response.data;
         
         if(blogId.length < 1 ){
          setIsloading(false);
          setNoHistory("No blog has been created yet...");
          return
         }

         const getBlog = async (id) => {
           try {
             const response = await axios.get(
               `https://blog-app-v8b8.onrender.com/api/blog/${id}`
             );
             const mainData = response.data;
             setBlogData((prevBlogData) => [...prevBlogData, mainData]);
             setIsloading(false);
           } catch (err) {
             console.log(err);
             setIsloading(false);
             toast.error(
               "Error retrieving this post, try refreshing this page"
             );
           }
         };

         blogId.forEach((item) => {
           getBlog(item);
         });
       } catch (err) {
         console.log(err);
         toast.error("Unable to get blog history");
       }
     };

  useEffect(() => {
    getHistory();
  }, []);

    const handleDeleteSuccess = () => {
       setBlogData([]);
      getHistory();
      toast.success("Blog deleted succesfully");
    };


  return (
    <>
    <ToastContainer />
      {displayModal && <DeletePost onClose={handleClose} postId={blogId} onDeleteSuccess={handleDeleteSuccess}/>}
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
          <div className="about flex flex-col gap-3 mt-5 relative">
            <main className=" flex flex-col md:flex-row gap-4">
              <ProfileSidebar value={"Account Setting"} />
              <section className="w-[100%] md:w-[75%] bg-white rounded-lg border border-1 border-gray-200 mt-5 py-7 px-5">
                <section className="bg-white rounded-md mt-5 py-5 px-2">
                  <h2 className=" text-2xl text-[#262630]">History</h2>
                  <div className=" absolute top-[50%] left-[50%] text-[18px] ">{noHistory}</div>
                  {
                    isLoading ? <div className="spinner w-[50%] mx-auto mt-5"></div> :
 
                    blogData.map((items) => {
                      const blogImage = items.blogImage.path;
                      const title = items.title
                     return (
                       <div key={items._id} className="flex justify-between items-center px-5 mt-10">
                         <div className="flex gap-3 items-center">
                           <img
                             src={blogImage}
                             alt=""
                             className="w-[32px] h-[32px] rounded-full object-cover"
                           />
                           <h3 className="text-[18px] text-gray-500">
                             {title}
                           </h3>
                         </div>
                         <div className="flex gap-5">
                           <button
                             className="bg-white border border-1 border-green-500 text-green-500 px-3 py-2 rounded-md  hover:bg-green-400 hover:border-none hover:text-white transition-all duration-300"
                             onClick={() => Navigate(`/edit-blog/${items._id}`)}
                           >
                             Edit post
                           </button>
                           <button
                             className="bg-white border border-1 border-red-500 text-red-500 px-3 py-2 rounded-md  hover:bg-red-400 hover:border-none hover:text-white transition-all duration-300"
                             onClick={() => {
                              setBlogId(items._id)
                              setDisplayModal(true);
                             }}
                           >
                             Delete post
                           </button>
                         </div>
                       </div>
                     ); 
                    }
                    )
                  }
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



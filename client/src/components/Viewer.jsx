import React, { useState, useEffect } from "react";
import axios from "axios";
import "draft-js/dist/Draft.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import ComMain from "./ComMain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Viewer = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem("alamadridBlogData");
    
    const fetchData = () => {
      axios
        .get("https://blog-app-v8b8.onrender.com/api/blog")
        .then((response) => {
          const mainData = response.data;
          setBlogPosts(mainData);
          localStorage.setItem("alamadridBlogData", JSON.stringify(mainData));
          setLoading(false);
          console.log("new");
        })
        .catch((err) => {
          toast.error("Error retrieving this post, try refreshing this page");
        });
    };

    if (cachedData) {
      setBlogPosts(JSON.parse(cachedData));
      setLoading(false);
      console.log("processed");

      fetchData();
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <ComMain />
      <ToastContainer />
      {loading ? (
        <div className="spinner w-[50%] mx-auto mt-5"></div>
      ) : (
        <section className="px-0 lg-px-5 xl:max-w-6xl xl:mx-auto pb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-0 lg-px-5 mb-20 ">
            {blogPosts.map((rawContent, index) => {
              const pic = rawContent.blogImage.path;
              return (
                <article
                  key={index}
                  className="hover:opacity-75 hover:transition-all duration-300  w-full mx-auto mt-[60px]"
                >
                  <Link to={`/blog/${rawContent._id}`}>
                    <div className="items-center justify-center flex lg:mt-[0%] mt-[10%]"></div>
                    <div>
                      <div className="items-center justify-center flex lg:pt-[3%] pt-[5%]">
                        <div className="w-[800px] h-[350px]">
                          <LazyLoadImage
                            className="w-[800px] h-[350px] object-cover rounded-md"
                            src={pic}
                            lazy="loading"
                            effect="blur"
                            alt={rawContent.title}
                          />
                        </div>
                      </div>
                      <h4 className="mt-6 header font-semibold text-xl lg:w-full ">
                        {rawContent.title}
                      </h4>
                      <div className="mt-[4%] max-h-[200px] box-border overflow-hidden">
                        <p className="text-sm leading-relaxed w-full text-justify">
                          {rawContent.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Viewer;

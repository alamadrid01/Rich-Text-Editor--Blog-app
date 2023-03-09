import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Allblogs from "./pages/Allblogs";
import CreateBlog from "./components/CreateBlog";
import Viewer from "./components/Viewer";


function App() {
  return (
    <div className="">
      <div className="max-w-screen-xl w-[90%] mx-auto">
        <Routes>
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/" element={<Viewer />} />
          <Route path="/allblogs" element={<Allblogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;

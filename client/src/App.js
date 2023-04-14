import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Allblogs from "./pages/Allblogs";
import CreateBlog from "./components/CreateBlog";
import Viewer from "./components/Viewer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/profile";
import AccountSetting from "./pages/Profile/AccountSetting";
import BlogHistory from "./pages/Profile/BlogHistory";
import EditBlog from "./components/EditPost/EditBlog";
import Payment from "./components/Payment";
import DownloadExtension from "./components/DownloadExtension";


function App() {
  return (
    <div className="">
      <div className="max-w-screen-xl w-[90%] mx-auto">
        <Routes>
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/" element={<Viewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<AccountSetting />} />
          <Route path="/profile/history" element={<BlogHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/download" element={<DownloadExtension />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
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

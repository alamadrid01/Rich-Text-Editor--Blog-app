import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const PasswordModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("aloy-user"));
    setUserId(data.userId);

  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError(true);
    }else{
      setError(false)
    }

    try{
      const pwdData = new FormData();
      pwdData.append("oldPassword", oldPassword);
      pwdData.append("newPassword", password);

      const changePassword = await axios.patch(
        `http://localhost:5001/api/change-password/${userId}`, pwdData
      );
      setIsLoading(false);
      if(changePassword.status === 204){
        toast.success("Password updated successfully");
        setTimeout(() => {
          onClose();
        }, 1200)
      }

    }catch(err){
      console.log(err)
      setIsLoading(false);
      toast.error("Unabe to update your password")
    }
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
    <ToastContainer />
      <main
        className=" z-10 fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center "
        onClick={handleClickOutside}
      >
        <div
          className=" flex flex-col bg-white  rounded-md px-8 py-4 w-5/6 sm:w-3/5 lg:w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[20px] font-bold text-green-800 text-center">
            Edit Password
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-3">
            <input
              type="password"
              placeholder="Old Password"
              name=""
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            <input
              type="password"
              placeholder="New Password"
              name=""
              id="new-passsword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            {error ? (
              <p className="text-[12px] text-red-600 mb-[-10px]">
                password does not match
              </p>
            ) : null}
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              id=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="focus focus:outline-green-200 px-3 py-4 rounded-lg border border-1"
            />
            {isLoading ? (
              <button
                disabled
                className="h-10 flex justify-center items-center bg-[#2ab2b1] text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300"
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
                type="submit"
                className="bg-[#2ab2b1] text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default PasswordModal;

import React from "react";

const Button = ({ value = "button" }) => {
  return (
    <>
      <button className="bg-black text-white px-3 md:px-6 px-6 py-3 rounded-md hover:opacity-75 transition-all duration-300">
        {value}
      </button>
    </>
  );
};

export default Button;

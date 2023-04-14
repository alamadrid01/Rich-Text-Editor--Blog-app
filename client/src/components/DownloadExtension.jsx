import React from "react";

const DownloadExtension = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Get the Aloy Blog Extension</h1>
      <p className="text-xl mb-4">
        Automaticaly login into Helium10 with Aloy Blog Extension.
      </p>
      <a
        href="https://www.example.com/aloy-extension.zip"
        download
        className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
      >
        Download Now
      </a>
    </div>
  );
};

export default DownloadExtension;

import React from "react";

const MeHeader = () => {
  return (
    <div className="flex max-w-screen-xl  mx-auto px-2 justify-between items-center bg-gray-100 p-4">
      {/* Left Side: Feeds */}
      <div className="flex space-x-4">
        <h1 className="text-xl font-bold">Feeds</h1>
        {/* middle */}
        <div className="flex space-x-3 text-gray-500">
          <a href="#" className="hover:text-black">
            Recents
          </a>
          <a href="#" className="font-bold text-black">
            Friends
          </a>
          <a href="#" className="hover:text-black">
            Popular
          </a>
        </div>
      </div>

      {/* Right Side: Stories */}
      <div className="flex space-x-4">
        <h1 className="text-xl font-bold">Stories</h1>
      </div>
    </div>
  );
};

export default MeHeader;

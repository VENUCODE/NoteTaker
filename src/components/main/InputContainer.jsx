import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

import AudioInput from "./AudioInput";
import ImageUpload from "../ImageUpload";
import { LuImageOff } from "react-icons/lu";

const InputContainer = () => {
  const [inputtext, setInputText] = useState("");
  return (
    <div className="mx-auto md:w-2/3 w-full py-2 bg-white   transition-all duration-100">
      {/* here add a container which has the icons of image,text-input and audio icon  use react-icons */}
      <div className="flex justify-around items-center shadow-lg shadow-gray-400/50   px-2 rounded-full  border-1 border-gray-200">
        <div className="flex items-center gap-2 p-2  rounded-full cursor-pointer">
          <div className="relative  transition-all duration-100  p-1 rounded-lg group">
            <LuImageOff
              size={20}
              color="#ff2323"
              className="-mt-2 text-red-800/80 cursor-pointer"
            />
            <span className="absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-500/30 text-red-800 text-xs px-2 py-1 rounded-md">
              Remove images
            </span>
          </div>
          <ImageUpload />
        </div>
        <input
          type="search"
          value={inputtext}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-2 text-sm ps-4 text-gray-600 font-semibold focus:bg-gray-200/30 focus:outline-none rounded-e-full   border-0 border-s-2 border-gray-400 "
          placeholder="Enter note data"
        />
        <div className="flex items-center py-2 gap-2 rounded cursor-pointer">
          <AudioInput setInputText={setInputText} />
          <button className="relative group flex items-center p-2  rounded-full text-white cursor-pointer bg-violet-500">
            <IoSend />
            <span className="font-normal absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-indigo-500/30 text-indigo-800 text-xs px-2 py-1 rounded-md">
              Add note
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputContainer;

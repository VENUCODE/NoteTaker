import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";

import AudioInput from "./AudioInput";

const InputContainer = () => {
  const [inputtext, setInputText] = useState("");
  return (
    <div className="mx-auto md:w-2/3 w-full py-2   transition-all duration-100">
      {/* here add a container which has the icons of image,text-input and audio icon  use react-icons */}
      <div className="flex justify-around items-center shadow-lg shadow-gray-400/50   px-2 rounded-full  border-1 border-gray-200">
        <div className="flex items-center p-2  rounded-full cursor-pointer">
          <LuImagePlus />
        </div>
        <input
          type="text"
          value={inputtext}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-2 text-sm ps-4 text-gray-600 font-semibold focus:bg-gray-200/30 focus:outline-none rounded-e-full   border-0 border-s-2 border-gray-400 "
          placeholder="Enter note data"
        />
        <div className="flex items-center py-2 gap-1 rounded cursor-pointer">
          <AudioInput setInputText={setInputText} />
          <button className="flex items-center p-2  rounded-full text-white cursor-pointer bg-violet-500">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputContainer;

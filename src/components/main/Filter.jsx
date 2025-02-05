import { useState } from "react";

import { RiEqualizerLine } from "react-icons/ri";

const Filter = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2 items-center  bg-white  rounded-full p-2 ">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 text-sm pl-4 focus:outline-gray-500/50 rounded-full border border-gray-400/50"
        placeholder="Search..."
      />

      <button className="md:text-md text-sm gap-2 capitalize bg-gray-200/50 hover:bg-gray-200/80 transition-all duration-100 py-1 px-2 text-slate-900 font-bold rounded-full flex flex-row items-center ">
        <RiEqualizerLine size={14} />
        <span className="">sort</span>
      </button>
    </div>
  );
};

export default Filter;

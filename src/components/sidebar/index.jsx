import { useState } from "react";

import { FaHouse, FaStar, FaUser } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";

const SideBar = ({ isOpen }) => {
  return (
    <div
      className={`fixed md:relative top-0  px-2  left-0 w-full md:w-64 bg-white text-gray-800 p-4 rounded-xl border-1 border-gray-300/40 transition-transform md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:block`}
    >
      <div className="flex  w-50">
        <span className="text-lg font-bold whitespace-nowrap flex flex-row items-center gap-2 border-b-1  border-gray-300/40 w-full pb-1 mx-2 ">
          <GiNotebook size={40} className="text-gray-700 animate-bounce" /> AI
          Notes
        </span>
      </div>
      <nav className="mt-4 flex flex-row lg:flex-col">
        <ul className="font-medium leading-8">
          <li className="flex ps-4 items-baseline p-2 text-sm text-gray-500  hover:bg-violet-300/30 hover:text-violet-500 rounded-full cursor-pointer">
            <FaHouse className="mr-1 " size={14} /> <span>Home</span>
          </li>
          <li className="flex ps-4 items-baseline p-2 text-sm text-gray-500 hover:bg-violet-300/30 hover:text-violet-500 rounded-full cursor-pointer">
            <FaStar className="mr-1 " size={14} />
            <span>Favorites</span>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-4 text-gray-600  left-4 flex items-end gap-2">
        <span className="bg-gray-300 shadow-md flex items-center justify-center p-2 rounded-full">
          <FaUser size={16} />
        </span>
        <span className="text-sm md:text-md font-bold">Username</span>
      </div>
    </div>
  );
};

export default SideBar;

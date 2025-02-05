import React from "react";
import { FaExclamation, FaImage } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import { BiRename } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FaFaceDizzy } from "react-icons/fa6";

const NoteSkeleton = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center p-6 py-10 h-full rounded-lg shadow-md w-full border border-gray-300/60 relative">
      <h1 className="text-xl font-extrabold">NO NOTES FOUND</h1>
      <p className="w-100  text-sm flex flex-row  gap-2 items-center justify-center text-gray-600 mt-1 leading-relaxed h-[18ch] overflow-hidden text-ellipsis whitespace-wrap">
        <FaFaceDizzy size={40} className="text-orange-600" />
        <FaExclamation size={60} className="text-red-500" />
      </p>
    </div>
  );
};

export default NoteSkeleton;

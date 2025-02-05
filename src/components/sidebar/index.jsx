import { FaSignOutAlt } from "react-icons/fa";
import { FaHouse, FaStar, FaUser } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { useAuth } from "../../contexts/useAuth";
import { Avatar } from "antd";
import hostUrl from "../../endpoints";
import { useEffect } from "react";

const SideBar = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      {/* Top Bar for Small and Medium Devices */}
      <div className="md:hidden  fixed top-0 left-0 w-full bg-white text-gray-800 p-3 flex justify-between items-center  z-50">
        {/* Menu Icon */}
        <GiNotebook size={30} className="text-gray-700 " />

        {/* Navigation Icons */}
        <div className="flex items-center justify-between gap-2">
          <div className="relative transition-all duration-100 hover:bg-violet-400 p-1 rounded-full group">
            <Avatar
              src={hostUrl + user?.profile_pic}
              color="danger"
              icon={<FaUser />}
              alt="user profile"
              size="default"
              className="shadow-md"
            />
            <span className="absolute capitalize left-1/2 -bottom-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black shadow-xl text-white text-xs px-2 py-1 rounded-md">
              {user?.username}
            </span>
          </div>
          <div
            onClick={() => logout()}
            className="relative cursor-pointer transition-all duration-100 hover:bg-red-200 p-2 rounded-full group"
          >
            <FaSignOutAlt size={25} className="text-red-600 " />
            <span className="absolute capitalize left-1/2 -bottom-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black shadow-xl text-white text-xs px-2 py-1 rounded-md">
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar for Large Devices (md and above) */}
      <div
        className={`hidden h-full md:block fixed md:relative top-0 px-2 left-0 w-64 bg-white text-gray-800 p-4 rounded-xl border-1 border-gray-300/40 transition-transform`}
      >
        <div className="flex w-50">
          <span className="text-lg font-bold whitespace-nowrap flex flex-row items-center gap-2 border-b-1 border-gray-300/40 w-full pb-1 mx-2">
            <GiNotebook size={40} className="text-gray-700 " />
            NoteTaker
          </span>
        </div>
        <nav className="mt-4 flex flex-row lg:flex-col">
          <ul className="font-medium leading-8">
            <li className="flex ps-4 transition-all duration-400 items-baseline p-2 text-sm  bg-violet-300/30 text-violet-500 rounded-full cursor-pointer">
              <FaHouse className="mr-1" size={14} /> <span>Home</span>
            </li>
          </ul>
        </nav>
        <div className="absolute  bottom-4 text-gray-600 left-4 ">
          <div className="relative flex justify-start gap-1 items-end w-[20ch]">
            <Avatar
              src={hostUrl + user?.profile_pic}
              color="danger"
              icon={<FaUser />}
              alt="user profile"
              className="text-violet-500 bg-violet-300"
              size="default"
            />

            <span className="text-md  font-semibold capitalize overflow-ellipsis">
              {user?.username}
            </span>
          </div>

          <div
            onClick={() => logout()}
            className="cursor-pointer relative bg-red-200/10  text-red-400 font-medium flex flex-row justify-end  px-2 py-1  m-2 gap-2 "
          >
            Logout
            <FaSignOutAlt size={20} className="text-red-600 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

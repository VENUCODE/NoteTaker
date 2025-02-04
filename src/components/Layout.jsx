import React from "react";
import { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import Main from "./main";
import SideBar from "./sidebar";
import { useMediaQuery } from "@uidotdev/usehooks";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");

  useEffect(() => {
    if (!isMediumDevice) setIsOpen(false);
  }, [isMediumDevice]);

  return (
    <>
      {isMediumDevice && (
        <button
          className="md:hidden p-2 text-gray-800 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdMenu size={24} />
        </button>
      )}

      <SideBar isOpen={isOpen} />

      <div className="flex-grow-1 p-0 m-0  bg-white rounded-lg border border-gray-300 shadow-md">
        <Main />
      </div>
    </>
  );
};

export default Layout;

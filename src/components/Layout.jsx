import React from "react";
import { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import Main from "./main";
import SideBar from "./sidebar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { NoteProvider } from "../contexts/useNote";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");

  useEffect(() => {
    if (!isMediumDevice) setIsOpen(false);
  }, [isMediumDevice]);

  return (
    <>
      <div className="flex gap-2 p-2">
        <SideBar isOpen={isOpen} />

        <div className="flex-grow-1 p-0 m-0  md:bg-white  bg-transparent rounded-lg md:border md:border-gray-300 md:shadow-md">
          <NoteProvider>
            <Main />
          </NoteProvider>
        </div>
      </div>
    </>
  );
};

export default Layout;

import { FaImage, FaPaperclip, FaSpinner } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { BiRename } from "react-icons/bi";
import { RiAiGenerateText } from "react-icons/ri";
import { useNote } from "../../contexts/useNote";
import { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Image, Modal, Upload } from "antd";
import hostUrl from "../../endpoints";

import { FaStar } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import ImageUpload from "../ImageUpload";

const NoteCard = ({ data }) => {
  const {
    _id: id,
    title,
    description,
    createdAt,
    audio,
    images = [],
    fav = false,
  } = data;

  const [openModal, setOpenModal] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFavorite, setIsFavorite] = useState(fav);
  const [newPhotos, setNewPhotos] = useState([]);

  const [isRename, setIsRename] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { deleteNote, updateNote, addNewPhotos } = useNote();

  const handleMaximizeMinimize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleFavoriteToggle = () => {
    handleUpdate(id, { fav: !isFavorite }, setUpdateLoading);
    setIsFavorite(!isFavorite);
  };

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };
  const handleDeleteNote = async () => {
    await deleteNote(id, setDeleteLoading);
  };
  const handleUpdate = async (payload) => {
    await updateNote(id, payload, setUpdateLoading);
  };
  const handleNewPhotos = async () => {
    if (newPhotos.length === 0) {
      return;
    }

    const formData = new FormData();
    newPhotos.forEach((photo) =>
      formData.append("images", photo.originFileObj)
    );
    await addNewPhotos(id, formData, setUploadLoading);
    setNewPhotos([]);
    setOpenModal(false);
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-300/60 relative">
      {/* Top Section */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <p>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(createdAt))}
        </p>
        <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-gray-700 text-[11px]">
          {audio ? (
            <>
              <FaPlay size={10} />
              <span>Audio</span>
            </>
          ) : (
            <>
              <RiAiGenerateText size={20} />
              <span>Text</span>
            </>
          )}
        </div>
      </div>

      {/* Title & Content */}
      <div className="m-0 p-0" onClick={() => setOpenModal(true)}>
        {!isRename && <h3 className="font-bold text-lg mt-1">{title}</h3>}
        {isRename && <input type="text" value={title} />}
        <div className="flex flex-col justify-between h-[19ch] w-full">
          <p className="text-sm text-gray-600 mt-1  max-h-[18ch] ">
            {description}
          </p>
          <span className="px-2 py-1 text-xs flex flex-row gap-2 w-fit items-center font-semibold rounded-full bg-gray-200/50 text-gray-700">
            <FaImage /> {images.length} {images.length > 1 ? "Images" : "Image"}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-end gap-3 items-center mt-3">
        <CopyToClipboard text={description} onCopy={onCopyText}>
          <div className="relative transition-all duration-100 hover:bg-blue-200/50 p-1 rounded-lg group">
            {copyStatus ? (
              <SiTicktick className="text-green-800" />
            ) : (
              <GrCopy className="text-blue-800/80 cursor-pointer" size={18} />
            )}
            <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-blue-700/20 text-blue-900 text-xs px-2 py-1 rounded-md">
              Copy
            </span>
          </div>
        </CopyToClipboard>

        <div className="relative transition-all duration-100 hover:bg-indigo-200/50 p-1 rounded-lg group">
          <BiRename className="text-indigo-800/80 cursor-pointer" size={18} />
          <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-indigo-700/20 text-indigo-900 text-xs px-2 py-1 rounded-md">
            Rename
          </span>
        </div>
        <div className="relative transition-all duration-100 hover:bg-indigo-200/50 p-1 rounded-lg group">
          <FaStar
            className={
              "cursor-pointer" + updateLoading ? "pointer-event-none" : ""
            }
            onClick={handleFavoriteToggle}
            size={19}
            color={isFavorite && "gold"}
          />
          <span className="absolute left-1/2 whitespace-nowrap -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-indigo-700/20 text-indigo-900 text-xs px-2 py-1 rounded-md">
            {isFavorite ? "Un-fav" : "Fav"}
          </span>
        </div>

        <button
          onClick={handleDeleteNote}
          disabled={deleteLoading}
          className="relative transition-all duration-100 hover:bg-red-200/50 p-1 rounded-lg group"
        >
          <BsTrash className="text-red-800/80 cursor-pointer" size={18} />
          <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-500/10 text-red-800 text-xs px-2 py-1 rounded-md">
            Delete
          </span>
        </button>
      </div>

      <Modal
        open={openModal}
        footer={null}
        onCancel={() => {
          setOpenModal(false);
          setIsMaximized(false);
        }}
        centered
        destroyOnClose={true}
        width={isMaximized ? "100%" : 520}
        height={isMaximized ? "100%" : "auto"}
        className="mx-auto my-auto"
        style={isMaximized ? { top: 0, left: 0, right: 0, bottom: 0 } : {}}
      >
        <div className="container h-100 mx-auto flex flex-col gap-2 p-4 custom-scroll ">
          {/* Title */}{" "}
          <p className="text-xs">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(createdAt))}
          </p>
          <div className="flex flex-row justify-between gap-2 items-center">
            <h2 className="text-violet-600 capitalize text-2xl font-bold">
              {title}
            </h2>
            <div className="flex gap-3 justify-end items-center mt-4">
              {isMaximized ? (
                <FiMinimize2
                  onClick={handleMaximizeMinimize}
                  size={18}
                  className="text-blue-800/80"
                />
              ) : (
                <FiMaximize2
                  onClick={handleMaximizeMinimize}
                  size={18}
                  className="text-blue-800/80"
                />
              )}

              <FaStar
                className={updateLoading ? "pointer-event-none" : ""}
                onClick={handleFavoriteToggle}
                size={19}
                color={isFavorite && "gold"}
              />
            </div>
          </div>
          {audio && (
            <>
              <div className="flex justify-center mt-2">
                <audio controls className="w-full bg-transparent custom-audio">
                  <source src={hostUrl + audio} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </>
          )}
          {/* Description */}
          <div className="flex flex-col gap-2 p-2 border-1 border-gray-300/60 my-2 rounded-lg">
            <p className="text-sm text-gray-600 ">{description}</p>
          </div>
          <div className="p-2 border-1 border-gray-300/60  rounded-lg">
            {/* <h2 className="text-gray-600 font-bold ">Images</h2> */}
            {images.length > 0 && (
              <div className="flex gap-2 flex-row flex-wrap ">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={hostUrl + image}
                    alt="note"
                    className="max-h-[10rem] max-w-1/4   object-fit-cover"
                  />
                ))}
              </div>
            )}
            <div className=" my-2 border-2 border-gray-300 p-2  rounded-lg">
              <ImageUpload
                notePhotos={newPhotos}
                setNotePhotos={setNewPhotos}
                type="picture-card"
                limit={10}
                size={30}
              />
              {newPhotos.length > 0 && (
                <button
                  onClick={handleNewPhotos}
                  className="bg-violet-500 my-2 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
                >
                  {uploadLoading ? (
                    <FaSpinner className="animate-spin" size={20} />
                  ) : (
                    "Add these photos"
                  )}
                </button>
              )}
            </div>
          </div>
          {/* Action Buttons */}
        </div>
      </Modal>
    </div>
  );
};

export default NoteCard;

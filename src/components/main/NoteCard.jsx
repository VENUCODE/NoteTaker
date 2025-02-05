import { FaImage, FaPaperclip } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { BiRename } from "react-icons/bi";
import { RiAiGenerateText } from "react-icons/ri";
import { useNote } from "../../contexts/useNote";
import { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Image, Modal } from "antd";
import hostUrl from "../../endpoints";
import { Button } from "antd";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

const NoteCard = ({ data }) => {
  const { _id: id, title, description, createdAt, audio, images = [] } = data;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); // State to manage max/minimize
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite

  const handleMaximizeMinimize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const { deleteNote } = useNote();
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
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
        <h3 className="font-bold text-lg mt-1">{title}</h3>
        <div className="flex flex-col justify-between h-[19ch]">
          <p className="text-sm text-gray-600 mt-1 leading-relaxed max-h-[18ch] overflow-hidden text-ellipsis whitespace-wrap">
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

        <button
          onClick={() => {
            deleteNote(id, setLoading);
          }}
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
        title={title}
        footer={null}
        onCancel={() => setOpenModal(false)}
        centered
        destroyOnClose={true}
        width={isMaximized ? "100%" : 520} // Toggle between full width and normal width
        style={isMaximized ? { top: 0, left: 0, right: 0, bottom: 0 } : {}}
      >
        <div className="flex flex-col gap-2 p-4 custom-scroll ">
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

            {isFavorite ? (
              <FaStar onClick={handleFavoriteToggle} size={19} color="gold" />
            ) : (
              <FaRegStar onClick={handleFavoriteToggle} size={18} />
            )}
          </div>
          <h2 className="text-gray-600 font-bold text-lg">Note Details</h2>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-600 font-bold">
              Title
            </label>
            <p className="text-sm text-gray-600">{title}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-gray-600 font-bold">
              Description
            </label>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          {/* Created At */}
          <div className="flex flex-col gap-2">
            <label htmlFor="createdAt" className="text-gray-600 font-bold">
              Created At
            </label>
            <p className="text-sm text-gray-600">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(createdAt))}
            </p>
          </div>

          {/* Audio */}
          {audio && (
            <>
              <h2 className="text-gray-600 font-bold mt-2">Recorded Audio</h2>
              <div className="flex justify-center mt-2">
                <audio controls className="w-full bg-transparent custom-audio">
                  <source src={hostUrl + audio} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </>
          )}

          {/* Images */}
          {images.length > 0 && (
            <>
              <h2 className="text-gray-600 font-bold mt-2">Images</h2>
              <div className="flex gap-2 flex-row flex-wrap ">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={hostUrl + image}
                    alt="note"
                    className="w-1/3  object-fit-cover"
                  />
                ))}
              </div>
            </>
          )}

          {/* Action Buttons */}
        </div>
      </Modal>
    </div>
  );
};

export default NoteCard;

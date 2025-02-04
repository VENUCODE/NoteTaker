import { FaImage, FaPaperclip } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { BiRename } from "react-icons/bi";
const description =
  "Lorem ipsum  olor descriptionipsum dolor sit amet, olor descriptionipsum  olor descriptionipsum dolor sit amet, consectetur adipiscing elit.dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit. dolor descriptionipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const NoteCard = ({
  title = "Title",
  content = description,
  time = new Date(),
  type = "text",
  duration = "00:09",
  images = [],
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-300/60 relative">
      {/* Top Section */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <p>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(time)}
        </p>
        <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-gray-700 text-[11px]">
          {type === "audio" ? (
            <>
              <FaPlay size={10} />
              <span>{duration}</span>
            </>
          ) : (
            <>
              <FaPlay size={10} />
              <span>{duration}</span>
            </>
          )}
        </div>
      </div>

      {/* Title & Content */}
      <h3 className="font-bold text-lg mt-1">{title}</h3>
      <div className="flex flex-col justify-between">
        <p className="text-sm text-gray-600 mt-1 leading-relaxed h-[18ch] overflow-hidden text-ellipsis whitespace-wrap">
          {content}
        </p>
        <span className="px-2 py-1 text-xs flex flex-row gap-2 w-fit items-center  font-semibold  rounded-full  bg-gray-200/50 text-gray-700">
          <FaImage /> 1 image
        </span>
      </div>

      {/* Image Count Indicator */}
      {images.length > 0 && (
        <div className="mt-2 flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md w-fit">
          <FaPaperclip size={12} className="mr-1" />
          {images.length} Image{images.length > 1 ? "s" : ""}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex justify-end gap-3 items-center mt-3">
        <div className="relative  transition-all duration-100 hover:bg-blue-200/50  p-1 rounded-lg group">
          <GrCopy className="text-blue-800/80 cursor-pointer" size={18} />
          <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-blue-700/20 text-blue-900 text-xs px-2 py-1 rounded-md">
            Copy
          </span>
        </div>

        <div className="relative  transition-all duration-100 hover:bg-indigo-200/50  p-1 rounded-lg group">
          <BiRename className="text-indigo-800/80 cursor-pointer" size={18} />
          <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-indigo-700/20 text-indigo-900 text-xs px-2 py-1 rounded-md">
            Rename
          </span>
        </div>

        <div className="relative  transition-all duration-100 hover:bg-red-200/50  p-1 rounded-lg group">
          <BsTrash className="text-red-800/80 cursor-pointer" size={18} />
          <span className="absolute left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-500/10 text-red-800 text-xs px-2 py-1 rounded-md">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

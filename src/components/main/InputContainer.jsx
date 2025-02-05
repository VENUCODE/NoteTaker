import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

import AudioInput from "./AudioInput";
import ImageUpload from "../ImageUpload";
import { LuImageOff } from "react-icons/lu";
import { Button, Image, Modal } from "antd";
import { useNote } from "../../contexts/useNote";
import { FaSpinner } from "react-icons/fa";

const InputContainer = () => {
  const [inputText, setInputText] = useState("");
  const [selectedImages, setImages] = useState([]);
  const [audio, setAudio] = useState(null);
  const [title, setTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { addNote } = useNote();
  const handleChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value === "") {
      handleClear();
    }
  };
  const handleClear = () => {
    setOpenModal(false);
    setInputText("");
    setImages([]);
    setAudio(null);
    setAudioUrl(null);
    setTitle("");
  };
  const handleAddNote = async () => {
    const formData = new FormData();
    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images", image.originFileObj);
      });
    }
    if (title) {
      formData.append("title", title);
    }
    if (audio) {
      console.log(audio);

      formData.append("audio", audio, "audio.wav");
    }
    if (inputText) {
      formData.append("description", inputText);
    }
    await addNote(formData, setLoading, handleClear);
  };
  useEffect(() => {
    const getUrl = async () => {
      if (audio) {
        const audioUrl = URL.createObjectURL(audio);
        setAudioUrl(audioUrl);
      }
    };
    getUrl();
  }, [audio]);
  return (
    <div className="mx-auto  transition-all duration-100 md:py-1 md:bg-white bg-transparent rounded-b-full">
      <div className="flex md:w-2/3 w-full px-2 mx-auto justify-around items-center shadow-lg bg-white shadow-gray-400/50    rounded-full  border-1 border-gray-200">
        <div className="flex items-center gap-2 p-2  rounded-full cursor-pointer">
          {selectedImages.length > 0 && (
            <div className="relative  transition-all duration-100  p-1 rounded-lg group">
              <LuImageOff
                size={20}
                color="#ff2323"
                onClick={() => setImages([])}
                className="-mt-2 text-red-800/80 cursor-pointer"
              />
              <span className="absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-500/30 text-red-800 text-xs px-2 py-1 rounded-md">
                Remove images
              </span>
            </div>
          )}
          <ImageUpload setNotePhotos={setImages} notePhotos={selectedImages} />
        </div>
        <input
          type="search"
          value={inputText}
          name="note"
          onChange={handleChange}
          className="flex-1 p-2 me-1 text-sm ps-4 text-gray-600 font-semibold focus:bg-gray-200/30 focus:outline-none rounded-e-full   border-0 border-s-2 border-gray-400 "
          placeholder="Enter note data ...."
        />
        <div className="flex items-center py-2 gap-2 rounded cursor-pointer">
          <AudioInput setInputText={setInputText} setAudio={setAudio} />
          <button
            onClick={() => setOpenModal(true)}
            disabled={inputText === ""}
            className={`relative group flex items-center justify-center p-2 rounded-full text-white cursor-pointer ${
              inputText === ""
                ? "bg-gray-300 opacity-50 cursor-not-allowed"
                : "bg-violet-500"
            }`}
          >
            <IoSend size={20} />
            <span className="hidden md:block font-normal absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-indigo-500/30 text-indigo-800 text-xs px-2 py-1 rounded-md">
              Add note
            </span>
          </button>
        </div>
      </div>
      <Modal
        open={openModal}
        title={"Add Note"}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-600 font-bold">
            Note Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 text-sm text-gray-600 font-semibold focus:bg-gray-200/30 focus:outline-gray-400   border-0 border-s-2 border-gray-400 "
            placeholder="Enter note title"
          />
          {/* conditionally display the inputText,audio and selectedImages */}
          {inputText && (
            <>
              <h2 className="text-gray-600 font-bold mt-2">Note description</h2>
              <p className="bg-gray-100 p-2 rounded-md">{inputText}</p>
            </>
          )}
          {audio && (
            <>
              <h2 className="text-gray-600 font-bold mt-2">Recorded Audio</h2>
              <div className="flex justify-center mt-2">
                <audio controls className="w-full bg-transparent custom-audio">
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </>
          )}
          {selectedImages.length > 0 && (
            <>
              <h2 className="text-gray-600 font-bold">Selected Images</h2>
              <div className="flex gap-2 flex-row flex-wrap  custom-scroll">
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url || image.preview || image.thumbUrl}
                    alt="note"
                    className="w-1/5 object-fit-cover"
                  />
                ))}
              </div>
            </>
          )}
          <button
            onClick={() => handleAddNote()}
            disabled={title === ""}
            className={`relative group transition-all duration-200 flex items-center justify-center p-2 rounded-full text-white cursor-pointer ${
              title === ""
                ? "bg-gray-300 opacity-50 cursor-not-allowed"
                : "bg-violet-500"
            }`}
          >
            {loading && (
              <>
                <FaSpinner />
                Adding.....
              </>
            )}
            {title === "" ? "Enter title to add Note" : "Add Note"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default InputContainer;

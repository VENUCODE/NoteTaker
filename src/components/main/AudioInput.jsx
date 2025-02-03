import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaMicrophoneAlt } from "react-icons/fa";

const AudioInput = ({ setInputText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-1 gap-2 items-center  text-white font-bold rounded-full flex items-center   transition-all duration-300 ${
          isRecording
            ? "bg-red-500  shadow-lg shadow-red-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isRecording ? (
          <span className="animate-pulse">
            <FaMicrophoneAlt size={20} />
          </span>
        ) : (
          <FaMicrophone size={14} />
        )}
        <span className="text-sm">
          {isRecording ? "Recording..." : "Speak up"}
        </span>
      </button>
    </>
  );
};

export default AudioInput;

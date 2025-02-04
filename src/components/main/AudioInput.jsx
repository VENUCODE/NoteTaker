import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";

const AudioInput = ({ setInputText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 1-minute timer
  const recognitionRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isRecording) {
      setTimeLeft(0);
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev < 60 ? prev + 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

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
      setInputText(finalTranscript);
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
        className={`p-2 items-center text-white font-bold rounded-full flex transition-all duration-300 ${
          isRecording
            ? "bg-lime-500 shadow-lg hover:bg-lime-600"
            : "bg-red-500 shadow-red-400"
        }`}
      >
        {isRecording ? (
          <div className="relative flex">
            <span className=" animate-pulse text-white">
              <FaMicrophone size={18} />
            </span>
            <span className="ps-2 text-sm">
              {timeLeft < 10 ? "0" + timeLeft : timeLeft} s
            </span>
          </div>
        ) : (
          <FaMicrophoneAltSlash size={18} />
        )}
      </button>
    </>
  );
};

export default AudioInput;

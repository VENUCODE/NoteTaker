import { message } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaMicrophoneAltSlash, FaSpinner } from "react-icons/fa";
import { MdPause, MdCancel, MdPlayArrow } from "react-icons/md";

const AudioInput = ({ setInputText, setAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    let timer;
    if (isRecording && !isPaused) {
      setTimeLeft(0);
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev < 60 ? prev + 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      message.error("Your browser does not support speech recognition.");
      return;
    }

    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
      };

      mediaRecorder.start();

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
      setIsPaused(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    } finally {
      setLoading(false);
    }
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsPaused(true);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
    }
  };

  const resumeRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsPaused(false);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const cancelRecording = () => {
    stopRecording();
    setInputText("");
    setAudio(null);
  };

  return (
    <div className="relative flex flex-col items-center">
      {isRecording && (
        <div className="absolute -top-12 flex space-x-2 transition-all duration-300">
          <button
            onClick={isPaused ? resumeRecording : pauseRecording}
            className={`p-2 text-yellow-500 rounded-full transition cursor-pointer ${
              isPaused
                ? "bg-green-500 hover:bg-green-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isPaused ? (
              <MdPlayArrow size={18} className="text-white" />
            ) : (
              <MdPause size={18} className="text-white" />
            )}
          </button>

          <button
            onClick={cancelRecording}
            className="p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
          >
            <MdCancel size={18} />
          </button>
        </div>
      )}

      {/* Main Mic Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 relative group items-center text-white font-bold rounded-full flex transition-all duration-300 cursor-pointer ${
          isRecording
            ? "bg-lime-500 shadow-lg hover:bg-lime-600"
            : "bg-red-500 shadow-red-400"
        }`}
      >
        {loading ? (
          <FaSpinner size={20} className="text-white animate-spin" />
        ) : isRecording ? (
          <div className="relative flex items-center">
            <span className="animate-pulse text-white">
              <FaMicrophone size={22} />
            </span>
            <span className="ps-2 text-xs">
              {timeLeft < 10 ? "0" + timeLeft : timeLeft} s
            </span>
          </div>
        ) : (
          <FaMicrophoneAltSlash size={22} />
        )}
        {!isRecording && (
          <span className="font-normal absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-500/30 text-red-800 text-xs px-2 py-1 rounded-md">
            Record
          </span>
        )}
      </button>
    </div>
  );
};

export default AudioInput;

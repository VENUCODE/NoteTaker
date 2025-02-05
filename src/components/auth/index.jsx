import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import "./auth.css";
const Auth = () => {
  const [mode, setMode] = useState("login");

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="w-full flex justify-center items-center h-full bg-auth">
      {mode === "login" ? (
        <Login onModeChange={handleModeChange} />
      ) : (
        <Signup onModeChange={handleModeChange} />
      )}
    </div>
  );
};

export default Auth;

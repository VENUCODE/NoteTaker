import React from "react";

const Login = ({ onModeChange }) => {
  return (
    <div className="container mx-auto p-4 pt-6 mt-10 mb-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-indigo-500 focus:border-indigo-500"
              id="email"
              type="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}"
              placeholder="Enter your email"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-indigo-500 focus:border-indigo-500"
              id="password"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              placeholder="Enter your password"
              autoComplete="off"
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex flex-row items-start text-gray-400">
          <hr className="mt-4 w-full border-1 border-gray-400" />
          <span>or</span>
          <hr className="mt-4 w-full border-1 border-gray-400" />
        </div>
        <div
          onClick={() => onModeChange("signup")}
          className="text-violet-500 tex-sm cursor-pointer hover:text-violet-700 text-center "
        >
          Create Account
        </div>
      </div>
    </div>
  );
};

export default Login;

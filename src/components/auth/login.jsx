import React, { useState } from "react";

import { LoginFormFields } from "./formFields";
import { Divider, message } from "antd";
import hostUrl, { endpoints } from "../../endpoints";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../../contexts/useAuth";
const INITIAL_FORM = {
  email: "",
  password: "",
};
const Login = ({ onModeChange }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { login } = useAuth();
  const [errors, setErrors] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: LoginFormFields[name].validation(value),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: LoginFormFields[name].validation(value),
    }));
  };
  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(LoginFormFields).reduce((acc, field) => {
      acc[field] = LoginFormFields[field].validation(formData[field]);
      return acc;
    }, {});

    setErrors(newErrors);
    await login(formData, setLoading, handleClear);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-blur rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(LoginFormFields).map((field) => (
            <div key={field} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field}
              >
                {LoginFormFields[field].label}
              </label>
              <input
                className={`block w-full p-2 pl-3 text-sm rounded-lg border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-indigo-500 focus:border-indigo-500`}
                id={field}
                name={field}
                required
                type={LoginFormFields[field].type}
                placeholder={LoginFormFields[field].placeholder}
                value={formData[field]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors[field] && (
                <span className="text-red-500 text-xs">{errors[field]}</span>
              )}
            </div>
          ))}

          <button
            className="bg-indigo-500 flex justify-center items-center gap-2 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            {loading ? (
              <>
                <FaSpinner size={18} className="animate-spin" /> Logging in ....
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <Divider
          className="text-gray-500"
          orientation="center"
          orientationMargin={0}
        >
          or
        </Divider>

        <div
          onClick={() => onModeChange("signup")}
          className="text-violet-900 text-sm cursor-pointer hover:text-violet-950 text-center mt-2"
        >
          {"Don't have an account? Register"}
        </div>
      </div>
    </div>
  );
};

export default Login;

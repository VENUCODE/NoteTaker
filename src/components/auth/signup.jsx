import React, { useState } from "react";
import signUpFormFields from "./formFields";
import { FaImage, FaSpinner } from "react-icons/fa";

import hosturl, { endpoints } from "../../endpoints/index";
import { Button, Divider, message } from "antd";
import { useAuth } from "../../contexts/useAuth";
const INITIAL_FORM = {
  username: "",
  email: "",
  password: "",
  profilePic: null,
};
const Signup = ({ onModeChange }) => {
  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { register } = useAuth();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_FORM);
    setPreview(null);
  };

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: signUpFormFields[name]?.validation
        ? signUpFormFields[name].validation(value)
        : "",
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profilePic: "" }));
    }
  };

  // Handle blur event (validate on focus loss)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: signUpFormFields[name]?.validation
        ? signUpFormFields[name].validation(value)
        : "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(signUpFormFields).reduce((acc, field) => {
      acc[field] = signUpFormFields[field]?.validation
        ? signUpFormFields[field].validation(formData[field])
        : "";
      return acc;
    }, {});

    if (!profilePic) {
      newErrors.profilePic = "Profile photo is required.";
    }

    setErrors(newErrors);

    const formDataObject = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataObject.append(key, formData[key])
    );
    formDataObject.append("profilePic", profilePic);

    await register(formDataObject, setLoading, () => {
      handleClear();
      onModeChange("login");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-blur rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Signup</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Profile Picture Upload */}
          <div className="mb-4">
            <h3 className="font-bold text-sm text-gray-700 py-2">
              Profile Photo<span className="text-red-400">*</span>
            </h3>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col px-2 rounded-md"
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover h-[100px] w-[200px] my-2 rounded-md"
                  />
                  <p className="text-gray-400 text-xs">
                    Click the image to change
                  </p>
                </>
              ) : (
                <div className="bg-gray-300/20 flex flex-col justify-center items-center p-4 w-max rounded-lg border-2 border-dashed border-gray-300">
                  <FaImage size={30} color="gray" />
                  <p className="text-sm text-gray-400 font-medium">
                    Upload profile photo
                  </p>
                </div>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".jpg, .jpeg, .png"
              name="profilePic"
              required
              className="hidden"
              onChange={handleImageChange}
            />
            {errors.profilePic && (
              <span className="text-red-500 text-xs">{errors.profilePic}</span>
            )}
          </div>

          {/* Map through signUpFormFields to create inputs dynamically */}
          {Object.keys(signUpFormFields).map((field) => (
            <div key={field} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field}
              >
                {signUpFormFields[field].label}
                <span className="text-red-400">*</span>
              </label>
              <input
                className={`block w-full p-2 pl-3 text-sm rounded-lg border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-indigo-500 focus:border-indigo-500`}
                id={field}
                name={field}
                required
                type={signUpFormFields[field].type}
                placeholder={signUpFormFields[field].placeholder}
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
            className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold
            py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center items-center gap-2 flex-row"
            type="submit"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" size={20} />
                Registering.....
              </>
            ) : (
              "Signup"
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
          onClick={() => onModeChange("login")}
          className="text-violet-900 text-sm cursor-pointer hover:text-violet-950 text-center mt-2"
        >
          Already have an account? Login
        </div>
      </div>
    </div>
  );
};

export default Signup;

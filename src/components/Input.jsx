import { useState } from "react";
const Input = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded-lg outline-none"
        placeholder="Add a new note..."
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
};

export default Input;

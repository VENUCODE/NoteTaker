//search input and filter btn(asc,desc)
import { useState } from "react";
const Filter = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center p-4 border-t">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded-lg outline-none"
        placeholder="Search..."
      />
      <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
        Asc/Desc
      </button>
    </div>
  );
};

export default Filter;

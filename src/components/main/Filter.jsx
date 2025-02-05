import { useState, useEffect } from "react";
import { RiEqualizerLine } from "react-icons/ri";

const Filter = ({ notes, setCurNotes }) => {
  const [text, setText] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const filteredNotes = notes.filter((note) => {
      const title = note.title.toLowerCase();
      const description = note.description.toLowerCase();
      const searchText = text.toLowerCase();
      return title.includes(searchText) || description.includes(searchText);
    });

    const sortedNotes = filteredNotes.sort((a, b) => {
      if (sort === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setCurNotes(sortedNotes);
  }, [notes, text, sort, setCurNotes]);

  const handleSort = () => {
    setSort((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex gap-2 items-center p-2 md:px-2 md:py-0 bg-white rounded-full">
    
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 text-sm pl-4 focus:outline-gray-500/50 rounded-full border border-gray-400/50"
        placeholder="Search..."
      />

      <button
        className="md:text-md text-sm gap-2 capitalize bg-gray-200/50 hover:bg-gray-200/80 transition-all duration-100 py-1 px-2 text-slate-900 font-bold rounded-full flex flex-row items-center"
        onClick={handleSort}
      >
        <RiEqualizerLine size={14} />
        <span>{sort === "asc" ? "Sort Asc" : "Sort Desc"}</span>
      </button>
    </div>
  );
};

export default Filter;

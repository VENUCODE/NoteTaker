import React from "react";
import NoteCard from "./NoteCard";
import "./Contents.css";

const Contents = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 custom-scroll sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((item) => (
          <NoteCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default Contents;

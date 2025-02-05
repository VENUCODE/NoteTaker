import React from "react";
import NoteCard from "./NoteCard";
import "./Contents.css";

import NoteSkeleton from "./NoteSkeleton";

const Contents = ({ notes }) => {
  return (
    <div className="h-full overflow-y-auto min-w-full ">
      <div className="grid grid-cols-1 min-w-full scroll-smooth custom-scroll sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {notes?.length == 0 && <NoteSkeleton />}
        {notes?.map((item, index) => (
          <NoteCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Contents;

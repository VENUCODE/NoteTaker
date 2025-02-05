import Contents from "./Contents";
import Filter from "./Filter";
import InputContainer from "./InputContainer";
import "./contents.css";
import { useNote } from "../../contexts/useNote";
import { useEffect, useState } from "react";
const Main = () => {
  const { notes, setNotes } = useNote();
  const [curNotes, setCurNotes] = useState(notes);
  useEffect(() => {
    setCurNotes(notes);
  }, [notes]);
  return (
    <div className="flex-1 h-full   flex flex-col bmd:g-transparent md:bg-white w-full rounded-full ">
      <div className="sticky top-15 w-full md:top-5   my-0 z-30 rounded-b-lg bg-white">
        <Filter notes={notes} setCurNotes={setCurNotes} />
        <p className="text-gray-400 text-xs  float-end me-4 py-0">
          {curNotes?.length} notes found
        </p>
      </div>
      <div className="flex-1 mt-10  md:mt-8 min-h-0 overflow-y-auto  bg-transparent  ">
        <Contents notes={curNotes} />
      </div>
      <div className="sticky bottom-0 w-full rounded-b-full">
        <InputContainer />
      </div>
    </div>
  );
};

export default Main;

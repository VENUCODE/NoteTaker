import Contents from "./Contents";
import Filter from "./Filter";
import InputContainer from "./InputContainer";
import "./contents.css";
const Main = () => {
  return (
    <div className="flex-1 h-full   flex flex-col bg-transparent  ">
      <div className="sticky top-14 w-full bg-red-400 md:top-5   my-0 z-30 rounded-full">
        <Filter />
      </div>
      <div className="flex-1 mt-9 min-h-0 overflow-y-auto md:bg-white ">
        <Contents />
      </div>
      <div className="sticky bottom-0 w-full">
        <InputContainer />
      </div>
    </div>
  );
};

export default Main;

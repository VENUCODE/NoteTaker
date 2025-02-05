import Contents from "./Contents";
import Filter from "./Filter";
import InputContainer from "./InputContainer";
import "./contents.css";
const Main = () => {
  return (
    <div className="flex-1 h-full flex flex-col ">
      <div className="sticky top-0 w-full bg-white my-0 z-30 rounded-full">
        <Filter />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Contents />
      </div>
      <div className="sticky bottom-0 w-full">
        <InputContainer />
      </div>
    </div>
  );
};

export default Main;

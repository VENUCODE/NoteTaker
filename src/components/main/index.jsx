import Contents from "./Contents";
import Filter from "./Filter";
import InputContainer from "./InputContainer";

const Main = () => {
  return (
    <div className="flex-1 h-full flex flex-col ">
      <Filter />
      <div className="flex-1 overflow-y-auto">
        <Contents />
      </div>
      <InputContainer />
    </div>
  );
};

export default Main;

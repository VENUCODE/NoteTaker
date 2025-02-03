import Contents from "./Contents";
import Filter from "./Filter";

const Main = () => {
  return (
    <div className="flex-1 p-6">
      <div>
        <Filter />
      </div>
      <div>
        <Contents />
      </div>
    </div>
  );
};

export default Main;

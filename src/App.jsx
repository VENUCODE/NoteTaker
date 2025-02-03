import Main from "./components/main";
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;

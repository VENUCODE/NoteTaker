const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-semibold mb-6">AI Notes</h2>
      <ul>
        <li className="p-2 bg-gray-700 rounded-lg cursor-pointer">Home</li>
        <li className="p-2 mt-2 hover:bg-gray-700 rounded-lg cursor-pointer">
          Favourites
        </li>
      </ul>
      <div className="absolute bottom-5 left-5 text-sm">Emmanual Vincent</div>
    </div>
  );
};

export default Sidebar;

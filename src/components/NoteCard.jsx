const NoteCard = ({
  title = "title",
  content = "content",
  time = "10-12-2002",
  type = "text",
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <p className="text-xs text-gray-500">{time}</p>
      <h3 className="font-bold text-lg mt-1">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{content}</p>
      {type === "audio" && (
        <button className="mt-2 text-blue-500">▶ Play</button>
      )}
    </div>
  );
};
export default NoteCard;

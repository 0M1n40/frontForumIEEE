import { useNavigate } from "react-router-dom";

const RecentTopics = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed right-5 top-24 w-60 h-[400px] bg-[#C3C3C3] shadow rounded-lg p-4 z-40">
      <h4 className="font-semibold text-gray-800">Tópicos recentes</h4>
      <ul className="py-6 space-y-2">
        {["java", "python", "c#"].map((tag, i) => (
          <li
            key={i}
            onClick={() => navigate(`/topico/${tag}`)}
            className="flex items-center justify-between bg-gray-100 border px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
          >
            <span>{tag}</span>
            <span className="text-sm px-2">{Math.floor(Math.random() * 20)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentTopics;
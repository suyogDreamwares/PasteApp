import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatToPastes, addToPastes } from "../Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pastes && pasteId) {
      const index = pastes.findIndex((paste) => paste.id === pasteId);
      if (index >= 0) {
        setTitle(pastes[index].title);
        setValue(pastes[index].content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    const date = new Date(paste.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    paste.createdAt = formattedDate;

    if (pasteId) {
      dispatch(updatToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex flex-row gap-6 justify-between items-center">
        <input
          type="text"
          placeholder="Enter Title Here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-lg mt-2 border-2 border-gray-300 w-full sm:w-[70%] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          className="p-4 rounded-lg mt-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          onClick={createPaste}
        >
          {pasteId ? "Update Paste" : "Create New Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="w-full sm:w-[70%] p-4 rounded-lg border-2 border-gray-300 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={value}
          placeholder="Enter Content Here..."
          rows={15}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;

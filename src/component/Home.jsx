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
  console.log("pastes::", pastes);

  useEffect(() => {
    if (pastes && pasteId) {
      const index = pastes.findIndex((paste) => paste.id === pasteId);
      if (index >= 0) {
        setTitle(pastes[index].title);
        setValue(pastes[index].content);
        console.log(title);
        console.log(value);
      }
    }
  }, []);

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
      console.log("pasteId::", pasteId);
      dispatch(updatToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex flex-row gap-7 justify-between items-center">
        <input
          type="text"
          placeholder="Enter Title Here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-2xl mt-2 border-2 w-full sm:w-[66%] pl-4 text-lg text-gray-700 bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
        />
        <button
          className="p-3 rounded-2xl mt-2 border-2 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create New Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="w-full sm:w-[66%] p-4 rounded-2xl border-2 bg-indigo-100 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
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

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PasteView = () => {
  const { pasteId } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);

  const paste = allPaste.filter((paste) => paste.id === pasteId)[0];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex flex-row gap-6 justify-between items-center">
        <input
          type="text"
          disabled
          value={paste.title}
          className="p-4 rounded-lg mt-2 border-2 border-gray-300 w-full sm:w-[70%] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-8">
        <textarea
          className="w-full sm:w-[70%] p-4 rounded-lg border-2 border-gray-300 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={paste.content}
          placeholder="Enter Content Here..."
          rows={15}
          disabled
        />
      </div>
    </div>
  );
};

export default PasteView;

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PasteView = () => {
  const { pasteId } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);

  const paste = allPaste.filter((paste) =>
    paste.id === pasteId)[0];

  console.log('paste::',paste);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          disabled
          type="text"
          placeholder="Enter Title Here..."
          value={paste.title}
          className="p-2 rounded-2xl mt-2 border-2 w-[66%] pl-4"
        />
      </div>
      <div className="mt-8">
        <textarea
          className=" w-[66%] pl-4 pt-2 rounded-2xl border-2"
          disabled
          value={paste.content
          }
          placeholder="Enter Content Here..."
          rows={15}
        ></textarea>
      </div>
    </div>
  );
};

export default PasteView;

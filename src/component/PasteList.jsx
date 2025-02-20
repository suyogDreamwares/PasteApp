import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/pasteSlice";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const PasteList = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }


  return (
    <div className="max-w-4xl mx-auto p-5">
  <input
    value={searchTerm}
    className="w-full p-3 rounded-2xl border-2 border-indigo-500 bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-lg text-gray-700"
    type="search"
    placeholder="Search here.."
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <div className="mt-8 space-y-6">
    {filterData.length > 0 &&
      filterData.map((paste, index) => {
        return (
          <div
            key={index}
            className="p-6 bg-white border-2 border-indigo-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center text-2xl font-semibold text-indigo-700 mb-3">
              {paste.title}
            </div>
            <div className="text-center text-lg text-gray-600 mb-4">{paste.content}</div>

            <div className="flex justify-center gap-6">
              
              <button  className=" mr-2 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300">
                <NavLink to={`/?pasteId=${paste?.id}`}>Edit</NavLink>
              </button>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300">
                <NavLink to={`/pastes/${paste?.id}`}>View</NavLink>
              </button>
              <button
                onClick={() => handleDelete(paste?.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success('Content copied');
                }}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
              >
                Copy
              </button>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300">
                Share
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">{paste.createdAt}</div>
          </div>
        );
      })}
  </div>
</div>

  );
};

export default PasteList;

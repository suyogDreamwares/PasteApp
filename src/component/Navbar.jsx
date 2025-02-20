import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" mx-auto py-4 px-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md">
        <NavLink
          to="/"
          className="text-white text-2xl font-bold py-2 px-6 hover:bg-indigo-700 rounded-lg transition duration-300 ease-in-out"
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className="text-white text-2xl font-bold py-2 px-6 hover:bg-indigo-700 rounded-lg transition duration-300 ease-in-out"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

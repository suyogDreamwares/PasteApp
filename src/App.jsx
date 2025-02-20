import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import PasteList from "./component/PasteList";
import PasteView from "./component/PasteView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navbar/>
      <Home/>
    </div>,
  },
  {
    path: "/pastes",
    element: <div>
       <Navbar/>
       <PasteList/>
    </div>,
  },
  {
    path: "/pastes/:pasteId",
    element: <div>
       <Navbar/>
       <PasteView/>
    </div>,
  },
]);

function App() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
export default App;

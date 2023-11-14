import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home.js";
import Navbar from "./Navbar.js";
import Game from "./Game.js";
import Leaderboard from "./leaderboard.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "game/:difficulty",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

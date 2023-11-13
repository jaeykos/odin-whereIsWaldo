import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home.js";
import Game from "./Game.js";
import Score from "./leaderboard.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "score",
    element: <Score />,
  },
  {
    path: "game/:difficulty",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

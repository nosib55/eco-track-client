import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // ✅ correct import

// Layout
import PublicLayout from "./layouts/PublicLayout";

// Pages
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

// ✅ Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "challenges",
        element: <Challenges />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// ✅ Render Application
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

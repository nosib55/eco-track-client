import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";   
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children:[
      { index: true,
        element : <Home></Home>
      },
      {
        path:"/challenges"


      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
 <StrictMode>
  <RouterProvider router={router} />,
 </StrictMode>
);

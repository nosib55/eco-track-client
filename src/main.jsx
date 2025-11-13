import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import AuthProvider from "./context/AuthProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MyActivities from "./pages/MyActivities";
import ChallengeDetail from "./pages/ChallengeDetail";
import ProtectedRoute from "./context/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AddChallenge from "./pages/AddChallenge";


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
        path: "/challenges/:id",
        element: <ChallengeDetail/>,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      
      {
  path: "/",
  element: (
    <ProtectedRoute>
      <DashboardLayout/>
    </ProtectedRoute>
  ),
  children: [
    
    { path: "my-activities", element: <MyActivities /> },
    { path: "profile", element: <Profile /> },
    { path: "add-challenge", element: <AddChallenge/> },
  ]
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
    <AuthProvider> <ToastContainer position="top-right" autoClose={2000} />
    <RouterProvider router={router} /></AuthProvider>
   
  </StrictMode>
);

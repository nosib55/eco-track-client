import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItemClass = ({ isActive }) =>
  "px-3 py-2 rounded-md" + (isActive ? " bg-green-600 text-white" : " hover:bg-green-50 text-gray-700");

export default function Navbar() {
  // you can later swap this with your AuthContext user
  const [user] = useState(null); // or mock: { displayName: "Green User", photoURL: "" }

  return (
    <div className="navbar bg-base-100 border-b fixed top-0 left-0 right-0 z-50">
      {/* Left: Brand + Mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                 d="M4 6h16M4 12h16M4 18h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-56">
            <li><NavLink to="/" end className={navItemClass}>Home</NavLink></li>
            <li><NavLink to="/challenges" className={navItemClass}>Challenges</NavLink></li>
            <li><NavLink to="/my-activities" className={navItemClass}>My Activities</NavLink></li>
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2">
                  <li><Link to="/about" className="px-3 py-2 rounded-md hover:bg-green-50">About</Link></li>
                  <li><Link to="/contact" className="px-3 py-2 rounded-md hover:bg-green-50">Contact</Link></li>
                </ul>
              </details>
            </li>
            <div className="divider my-1"></div>
            {!user ? (
              <>
                <li><Link to="/login" className="px-3 py-2 rounded-md hover:bg-green-50">Login</Link></li>
                <li><Link to="/register" className="px-3 py-2 rounded-md btn btn-success text-white">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile" className="px-3 py-2 rounded-md hover:bg-green-50">Profile</Link></li>
                <li><Link to="/my-activities" className="px-3 py-2 rounded-md hover:bg-green-50">My Activities</Link></li>
                <li><button className="px-3 py-2 rounded-md text-error hover:bg-red-50">Logout</button></li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl text-green-700"><img src="/src/eco-nav.gif" alt="" className="h-16" /></Link>
      </div>

      {/* Center: Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" end className={navItemClass}>Home</NavLink></li>
          <li><NavLink to="/challenges" className={navItemClass}>Challenges</NavLink></li>
          <li><NavLink to="/my-activities" className={navItemClass}>My Activities</NavLink></li>
          <li>
            <details>
              <summary>More</summary>
              <ul className="p-2 bg-base-100">
                <li><Link to="/about" className="px-3 py-2 rounded-md hover:bg-green-50">About</Link></li>
                <li><Link to="/contact" className="px-3 py-2 rounded-md hover:bg-green-50">Contact</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Right: Auth actions / user dropdown */}
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-success text-white">Register</Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full">
                <img
                  alt="user"
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || "User"
                    )}&background=16a34a&color=fff`
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li className="menu-title">{user.displayName || "User"}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/my-activities">My Activities</Link></li>
              <li><button className="text-error">Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

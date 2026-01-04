import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const navItemClass = ({ isActive }) =>
  `px-3 py-2 rounded-md font-medium transition
   ${isActive
     ? "bg-green-600 text-white"
     : "text-gray-800 hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-800"
   }`;

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className="
        navbar fixed top-0 inset-x-0 z-50
        bg-gradient-to-r from-green-50 via-emerald-50 to-green-100
        dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
        backdrop-blur-md border-b border-green-200 dark:border-gray-700
        shadow-sm
      "
    >
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <button
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-900 rounded-box w-56 z-[60]">
            <li><NavLink to="/" end className={navItemClass}>Home</NavLink></li>
            <li><NavLink to="/challenges" className={navItemClass}>Challenges</NavLink></li>
            {user && (
              <li><NavLink to="/my-activities" className={navItemClass}>My Activities</NavLink></li>
            )}

            {user && (
              <li>
                <details>
                  <summary>More</summary>
                  <ul className="p-2">
                    <li><Link to="/add-challenge">Add Challenge</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </details>
              </li>
            )}

            <div className="divider my-1" />

            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li>
                  <Link to="/register" className="btn btn-success btn-sm text-white">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* TEXT LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 px-2 font-bold text-xl tracking-wide
                     text-green-700 dark:text-green-400"
        >
          <span className="text-2xl">♻️</span>
          <span>EcoTrack</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li><NavLink to="/" end className={navItemClass}>Home</NavLink></li>
          <li><NavLink to="/challenges" className={navItemClass}>Challenges</NavLink></li>
          <li><NavLink to="/about" className={navItemClass}>About</NavLink></li>
          {user && (
            <li><NavLink to="/my-activities" className={navItemClass}>My Activities</NavLink></li>
          )}

          {user && (
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2 bg-base-100 dark:bg-gray-900">
                  <li><Link to="/add-challenge">Add Challenge</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-success text-white">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full ring ring-green-400 ring-offset-2 ring-offset-base-100">
                <img
                  alt="User"
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName || "User"}`
                  }
                />
              </div>
            </button>

            <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-900 rounded-box w-52">
              <li className="menu-title">{user.displayName || "User"}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

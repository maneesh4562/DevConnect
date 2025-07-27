import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <div className="flex items-center space-x-4">
      <Link to="/dashboard" className="text-gray-300 hover:text-white">
        Dashboard
      </Link>
      <Link to="/create-project" className="text-gray-300 hover:text-white">
        Add Project
      </Link>
      {user && (
        <div className="flex items-center">
          <img
            src={user.profilePicture ? user.profilePicture : '/default-avatar.png'}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <Link to="/edit-profile" className="text-gray-300 hover:text-white">
            {user.name}
          </Link>
        </div>
      )}
      <button
        onClick={onLogout}
        className="text-gray-300 hover:text-white"
      >
        Logout
      </button>
    </div>
  );

  const guestLinks = (
    <div className="flex items-center space-x-4">
      <Link to="/register" className="text-gray-300 hover:text-white">
        Register
      </Link>
      <Link to="/login" className="text-gray-300 hover:text-white">
        Login
      </Link>
    </div>
  );

  return (
    <nav className="bg-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            DevConnect
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
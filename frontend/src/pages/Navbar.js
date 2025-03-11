import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAdminAuth } from "../Contexts/AdminLoggedin";

const API_BASE_URL = "https://events-nc.onrender.com";

const Navbar = () => {

  const { isAdmin, loginAdmin, logoutAdmin } = useAdminAuth();

  return (
    <nav
      className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-md"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center" aria-label="Go to Home Page">
          <span className="text-2xl font-bold">Event Manager</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
            aria-label="Go to Home Page"
          >
            Home
          </Link>
          {isAdmin && (
            <Link
              to="/create"
              className="hover:text-yellow-300 transition duration-300"
              aria-label="Create a new event"
            >
              Create Event
            </Link>
          )}
          <div className="hover:text-yellow-300 transition duration-300 flex items-center cursor-pointer">
            <UserIcon className="w-6 h-6 mr-1" />
            {isAdmin ? (
              <span
                onClick={logoutAdmin}
                role="button"
                aria-label="Logout from admin account"
              >
                Admin Logout
              </span>
            ) : (
              <Link to="/login" aria-label="Go to admin login page">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

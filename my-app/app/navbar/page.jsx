"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { FaUser, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react"; // Import NextAuth hooks


const Navbar = () => {
  const [fullName, setFullName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession(); // Get session from NextAuth

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
  
      try {
        if (status === "authenticated" && session) {
          console.log("Session:", session); // Log the entire session object
  
          const { accessToken, user,provider ,userId} = session;
          console.log("Access Token:", accessToken);
          console.log("Provider:",provider)
          console.log("User:", user); // Log the user object
  
          // Assuming `id` and `email` are part of `user` object
          console.log("Email:", user?.email);
          console.log("User ID:", userId);
  
          setFullName(user?.name);
        } else {
          const token = Cookies.get("token");
          if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken && decodedToken.fullName) {
              setFullName(decodedToken.fullName);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserDetails();
  }, [session, status]);
  

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear token and handle social logout
    Cookies.remove("token");
    setFullName(null);
    setDropdownOpen(false);
    signOut(); // Use NextAuth's signOut to log out of social accounts
  };

  const firstLetter = fullName ? fullName.charAt(0).toUpperCase() : "";

  return (
    <div className="sticky top-0 z-50 flex justify-between h-16 items-center bg-white px-10 shadow-md">
      <div className="flex items-center cursor-pointer">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 p-1 rounded-md shadow-lg ml-20">
          <span className="block font-bold text-2xl text-white bg-white bg-opacity-10 px-4 py-1 rounded-md tracking-wider">
            <Link href="/">SAFAR</Link>
          </span>
        </div>
      </div>
      {fullName ? (
        <div className="relative flex items-center">
          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-lg">
            {firstLetter}
          </div>
          <div
            className="flex items-center ml-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full text-white shadow-md hover:shadow-lg hover:bg-gradient-to-l transition-transform transform hover:scale-105 text-base"
            onClick={toggleDropdown}
          >
            <span className="font-medium">Hi {fullName}</span>
            <svg
              className="w-4 h-4 ml-2 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                <li className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-300">
                  <FaUser className="mr-3 text-blue-600" />
                  <Link href="/profile" className="text-blue-600">
                    My Profile
                  </Link>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-300">
                  <FaListAlt className="mr-3 text-blue-600" />
                  <Link href="/profile" className="text-blue-600">
                    My Bookings
                  </Link>
                </li>
                <li
                  className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-300"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-3 text-blue-600" />
                  <span className="text-blue-600">Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-6">
          <button className="text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300">
            <Link href="/login">Login</Link>
          </button>
          <button className="text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300">
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

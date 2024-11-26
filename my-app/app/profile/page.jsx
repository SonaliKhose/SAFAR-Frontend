"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react"; // Import useSession from NextAuth
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendar,
  faCamera,
  faSignOutAlt,
  faHome,
  faCity,
  faFlag,
  faMailBulk,
  faVenusMars,
  faEdit,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    dateOfBirth: "",
    profilePicture: "",
  });

  const [bookingHistory, setBookingHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const { data: session } = useSession(); // Get session from NextAuth

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = Cookies.get("token");
        const isSocialLogin = !!session && !!session.user;

        if (!token && !isSocialLogin) {
          window.location.href = "/login";
          return;
        }

        let userId, fullName, email, response;

        if (token) {
          // User is logged in with traditional credentials (token-based)
          const decodedToken = jwtDecode(token);
          userId = decodedToken.user_id; // Assuming your token contains `user_id`
          fullName = decodedToken.fullName;
          email = decodedToken.email;

          // Fetch profile data from profile collection
          response = await axios.get(`http://localhost:8000/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
        } else if (isSocialLogin) {
          // User is logged in with social authentication (session-based)
          userId = session.userId; // Get the user ID from the session
          fullName = session.user.name;
          email = session.user.email;

          console.log(userId);
          // Fetch social profile data from social-profile collection
          response = await axios.get(
            `http://localhost:8000/social-profile?user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`, // Use session-based token
              },
            }
          );
        }

        // Safely access response data using optional chaining
        const profile = response?.data?.profile || {};

        setProfileData({
          fullName: fullName || profile.fullName || "",
          email: email || profile.email || "",
          contactNo: profile.contactNo || "",
          gender: profile.gender || "",
          address: profile.address || "",
          city: profile.city || "",
          pincode: profile.pincode || "",
          state: profile.state || "",
          country: profile.country || "",
          dateOfBirth: profile.dateOfBirth?.split("T")[0] || "",
          profilePicture: profile.profilePicture || "",
        });

        setBookingHistory(response?.data?.bookings || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));

      // Create FormData to send the image
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const token = Cookies.get("token");
        const isSocialLogin = !!session && !!session.user;

        let endpoint;

        if (isSocialLogin) {
          const userId = session.userId; // Get the user ID from the session
          endpoint = `http://localhost:8000/social-profile/image?user_id=${userId}`;
        } else {
          endpoint = "http://localhost:8000/profile/image";
        }

        // Send the image to the backend
        const response = await axios.put(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Update the profile picture in state
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: response.data.profile.profilePicture, // Assuming response has updated image URL
        }));

        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Error updating profile picture. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const isSocialLogin = !!session && !!session.user;

      if (!token && !isSocialLogin) {
        window.location.href = "/login";
        return;
      }

      const formData = new FormData();
      for (const key in profileData) {
        if (key === "profilePicture" && typeof profileData[key] === "string") {
          continue;
        }
        formData.append(key, profileData[key]);
      }

      let endpoint, authToken;

      if (isSocialLogin) {
        // User is logged in with social authentication (session-based)
        const userId = session.userId; // Get the user ID from the session
        endpoint = `http://localhost:8000/social-profile?user_id=${userId}`;
        authToken = session.accessToken; // Use session-based token
      } else {
        // User is logged in with traditional credentials (token-based)
        endpoint = "http://localhost:8000/profile";
        authToken = token; // Use traditional token
      }

      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Update profile picture if it changed
      if (response.data.profile.profilePicture) {
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: response.data.profile.profilePicture,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  const calculateCompletion = () => {
    let fieldsCompleted = 0;
    const fields = [
      profileData.fullName,
      profileData.email,
      profileData.contactNo,
      profileData.gender,
      profileData.address,
      profileData.city,
      profileData.pincode,
      profileData.state,
      profileData.country,
      profileData.dateOfBirth,
      profileData.profilePicture,
    ];
    fields.forEach((field) => {
      if (field) fieldsCompleted++;
    });
    return (fieldsCompleted / fields.length) * 100;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6 mt-6 border-l border-gray-300">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 relative border-4 border-blue-500 bg-gray-200 shadow-md rounded-full">
            {profileData.profilePicture ? (
              <Image
                src={
                  typeof profileData.profilePicture === "string"
                    ? `http://localhost:8000${profileData.profilePicture}`
                    : URL.createObjectURL(profileData.profilePicture)
                }
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-500 text-4xl font-bold">
                {profileData.fullName ? profileData.fullName.charAt(0) : "U"}
              </div>
            )}

            {/* Edit icon for editing the profile picture */}
            <label className="absolute bottom-1 right-1 bg-white border-2 border-blue-500 rounded-full p-1 shadow-lg cursor-pointer transition-transform transform hover:scale-105 w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faPen} className="text-blue-500 text-sm" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {profileData.fullName || "User Name"}
          </h2>
          <p className="text-gray-600">
            {profileData.email || "user@example.com"}
          </p>
          <p className="text-gray-600">
            {profileData.contactNo || "Mobile Number"}
          </p>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeSection === "profile"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveSection("bookings")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeSection === "bookings"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            Bookings
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 min-h-screen bg-gray-100">
        {activeSection === "profile" && (
          <>
            {/* <!-- Profile Completion Bar --> */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Profile Completion</h2>
              <div className="relative">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${calculateCompletion()}%` }}
                  ></div>
                </div>
                <span className="absolute top-0 right-0 text-sm font-medium text-gray-600">
                  {Math.round(calculateCompletion())}%
                </span>
              </div>
            </div>

            {/* <!-- Profile Section --> */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
              <button
                onClick={handleEditToggle}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
              >
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-white text-lg mr-2"
                    />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* <!-- Form Section --> */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <!-- Full Name --> */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                      readOnly
                    />
                  </div>
                  {/* 
            <!-- Email --> */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                      readOnly
                    />
                  </div>

                  {/* <!-- Phone Number --> */}
                  <div>
                    <label
                      htmlFor="contactNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faPhone} className="mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={profileData.contactNo}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- Address --> */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faHome} className="mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- City --> */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faCity} className="mr-1" />
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- Country --> */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faFlag} className="mr-1" />
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- Postal Code --> */}
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faMailBulk} className="mr-1" />
                      Pin Code
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={profileData.pincode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- Date of Birth --> */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* <!-- Gender --> */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FontAwesomeIcon icon={faVenusMars} className="mr-1" />
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={!isEditing}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        {activeSection === "bookings" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Booking History
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
              {bookingHistory.length === 0 ? (
                <p className="text-gray-600">No bookings found.</p>
              ) : (
                <ul className="space-y-4">
                  {bookingHistory.map((booking, index) => (
                    <li key={index} className="border-b pb-4">
                      <p className="text-gray-800">
                        <strong>Booking ID:</strong> {booking.id}
                      </p>
                      <p className="text-gray-600">
                        <strong>Flight:</strong> {booking.flightNumber}
                      </p>
                      <p className="text-gray-600">
                        <strong>Date:</strong>{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Amount:</strong> ${booking.amount}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

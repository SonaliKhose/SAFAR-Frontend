"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Modal from "../components/modal";
import { isValidEmail, isValidPassword, isValidFullName } from "../utils/validations"; // Import validation functions

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useRouter();

  // Function to handle sign up
  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    if (!isValidFullName(fullName)) {
      setError("Please enter a valid full name.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/signup`,
        { fullName, email, password, gender },
        { headers: { "Content-type": "application/json" } }
      );
      const data = res.data;

      if (res.status === 201) {
        setModalTitle("Success");
        setModalMessage(data.message);
        setIsModalOpen(true);
        Cookies.set('cookieName', 'cookieValue', { expires: 30 });
        setSuccess(data.message);
      }
    } catch (err) {
      setModalTitle("Error");
      setModalMessage(
        err.response?.data?.message || "Signup failed. Please try again."
      );
      setIsModalOpen(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalTitle === "Success") {
      navigate.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your Fullname"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </form>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}  // Close modal and redirect on success
          title={modalTitle}
          message={modalMessage}
        />
      </div>
    </div>
  );
};

export default Signup;

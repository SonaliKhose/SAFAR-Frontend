"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { validateEmail, validateNotEmpty } from "../utils/validations"; // Import validation functions
import { signIn, signOut, useSession } from 'next-auth/react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useRouter();
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  // Validation function before submitting
  const validateForm = () => {
    let isValid = true;
    let errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!validateNotEmpty(password)) {
      errors.password = "Password cannot be empty";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // login with Credentials
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );
      if (res.status === 200) {
        Cookies.set("token", res.data.token, { expires: 1 });
        setIsModalOpen(true); // Show modal on successful login
      } else {
        console.log("Some error in login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  //login with Google
  const handleGoogleLogin = async () => {
    // try {
    //   const response = await axios.get(`http://localhost:8000/auth/google`, {
    //     headers: {
    //       "Content-type": "application/json"
    //     }
    //   });
    //   const data = response.data;
    //   console.log(data);
    //   // Add your logic here if the request is successful
    // } catch (err) {
    //   console.error("Google login error:", err.message);
    //   // Handle the error here (e.g., show a user-friendly message)
    // }

    // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    // const params = new URLSearchParams({
    //   response_type: "code",
    //   client_id:
    //     "14278712917-lvu476o0kpdfsfq06m4m939bvbb8dgil.apps.googleusercontent.com",
    //   redirect_uri: "http://localhost:8000/auth/google/callback",
    //   scope: "email profile",
    // });

    // window.location.href = `${googleAuthUrl}?${params.toString()}`;
  };

  //login with Facebook
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:8000/auth/facebook";
  };

  //login with Github
  const handleGithubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=Ov23linCOZO8Th8kUbnN&scope=user:email`
    );
  };

  //login with LinkedIn
  const handleLinkedinLogin = () => {
    window.location.href = `http://localhost:8000/auth/linkedin`;
  };

  //login with Instagram
  const handleInstagramLogin = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize`;
    const params = new URLSearchParams({
      client_id: "3416172612010085", // Your Instagram Client ID
      redirect_uri: "https://localhost:8000/auth/instagram/callback", // Ensure this matches your app settings
      response_type: "code",
      scope: "user_profile user_media",
    });

    window.location.href = `${instagramAuthUrl}?${params.toString()}`;
  };
  // Close the modal and redirect to the desired page
  const closeModal = () => {
    setIsModalOpen(false);
    navigate.push("/"); // Redirect to home or any other page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Login Page
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
            {formErrors.email && (
              <p className="text-sm text-red-600">{formErrors.email}</p>
            )}
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
              onChange={(e) => setPassword(e.target.value)}
              
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            />
            {formErrors.password && (
              <p className="text-sm text-red-600">{formErrors.password}</p>
            )}
            {/* Forgot password link */}
            <div className="mt-2 text-right">
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <div className="text-center">
          <h2 className="text-sm font-medium text-gray-700">Or Sign in with</h2>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              // onClick={handleGoogleLogin}
              onClick={() => signIn('google')}
              className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full hover:bg-red-700"
            >
              <FaGoogle />
            </button>
            <button
              // onClick={handleFacebookLogin}
              onClick={() => signIn('facebook')}
              className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              <FaFacebook />
            </button>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-center">Login Successful!</h2>
            <p className="text-center mt-2">You have successfully logged in.</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

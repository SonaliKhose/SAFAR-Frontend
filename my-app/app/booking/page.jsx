"use client";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { CarContext } from "../context/carcontext";
import { TripContext } from "../context/tripcontext";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { FaExclamationCircle } from "react-icons/fa";
import {
  validateEmail,
  validateMobileNumber,
  validateNotEmpty,
} from "../utils/validations";
import Breadcrumb from "../components/breadcrumbs";

function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const travelAgencyId = searchParams.get("travelAgencyId");
  const distance = [30, 73, 93, 63, 93, 23];
  const randomIndex = Math.floor(Math.random() * distance.length);
  const { tripdata, tripType } = useContext(TripContext);
  const { carDetails } = useContext(CarContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pickupAdd, setPickupAdd] = useState("");
  const [dropAdd, setDropAdd] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!carId || !travelAgencyId) {
      router.push("/");
      return;
    }

    // Retrieve and decode the token when component mounts
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.fullName || ""); // Set the name from the token
        setEmail(decodedToken.email || ""); // Set the email from the token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [carId, travelAgencyId, router]);

  const breadcrumbLinks = [
    { href: "/", label: "Home" },
    { href: "/travels", label: "Select Travels" },
    { href: `/travels/${travelAgencyId}`, label: "Select Cars" },
    {
      href: `/booking?carId=${carId}&travelAgencyId=${travelAgencyId}`,
      label: "Book Cars",
    },
  ];

  const handleBooking = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!validateNotEmpty(name)) validationErrors.name = "Name is required";
    if (!validateEmail(email)) validationErrors.email = "Invalid email address";
    if (!validateMobileNumber(mobileNo))
      validationErrors.mobileNo = "Invalid mobile number";
    if (!validateNotEmpty(pickupAdd))
      validationErrors.pickupAdd = "Pickup address is required";
    if (!validateNotEmpty(dropAdd))
      validationErrors.dropAdd = "Drop address is required";

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    } else {
      // Process form submission
      setErrors({});
      console.log("Form submitted!");
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("User not authenticated. Token not found in cookies.");
      }

      const decodedToken = jwtDecode(token);
      const user = decodedToken.userId;

      if (!user) {
        throw new Error("User ID could not be extracted from token.");
      }

      const response = await axios.post(
        "http://localhost:8000/booking",
        {
          user, // Include user ID
          tripType, // Use the validated trip type
          carType: carDetails.cartype,
          name,
          email,
          mobileNo,
          pickupAdd,
          dropAdd,
          pickupDate: tripdata?.pickupDate,
          returnDate: tripdata?.returnDate,
          pickupTime: tripdata?.pickupTime,
          from: tripdata?.from,
          to: tripdata?.to,
          distance: distance[randomIndex],
          fare: carDetails.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert("Unexpected response format received from the server.");
      }

      router.push("/"); //successfull booking
    } catch (error) {
      console.error("Error in booking:", error);

      if (error.response && error.response.status === 401) {
        alert("Unauthorized access. Please log in again.");
        router.push("/login");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Please Login before you Book!");
        router.push("/login");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb links={breadcrumbLinks} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
            Contact & Pickup Details
          </h2>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                readOnly
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name here"
                className="mt-1 block w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.name && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                className="mt-1 block w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Mobile
              </label>
              <div className="flex">
                <select className="mr-2 block w-1/3 border-gray-300 rounded-lg p-1.5 focus:border-blue-500">
                  <option value="India (+91)">India (+91)</option>
                </select>
                <input
                  name="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  type="text"
                  placeholder="Enter your phone number here"
                  className="block w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" /> {errors.mobileNo}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Pickup Address
              </label>
              <input
                name="pickupAdd"
                value={pickupAdd}
                onChange={(e) => setPickupAdd(e.target.value)}
                type="text"
                placeholder="Enter your pickup address"
                className="mt-1 block w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.pickupAdd && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {errors.pickupAdd}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Drop Address
              </label>
              <input
                type="text"
                name="dropAdd"
                value={dropAdd}
                onChange={(e) => setDropAdd(e.target.value)}
                placeholder="Enter your drop address"
                className="mt-1 block w-full border-gray-300 rounded-lg p-1.5 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.dropAdd && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" /> {errors.dropAdd}
                </p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
              >
                Book
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Your Booking Details
          </h2>

          <div className="space-y-4">
            {tripdata?.from && (
              <div>
                <strong>Itinerary :</strong>
                <br />
                <strong>From :</strong> {tripdata.from} <br />
                <strong>To :</strong> {tripdata.to} <br />
              </div>
            )}
            <div>
              <strong>Pickup Date :</strong> {tripdata.pickupdate}
            </div>
            <div>
              <strong>Pickup Time :</strong> {tripdata.pickuptime}
            </div>
            {tripdata?.returndate && tripdata.returndate !== "" && (
              <div>
                <strong>Return Date :</strong> {tripdata.returndate}
              </div>
            )}
            {tripdata?.trip && tripType == "airport" && (
              <div>
                <strong>Airport Trip :</strong> {tripdata.trip}
              </div>
            )}
            <div>
              <strong>Trip Type :</strong> {tripType}
            </div>
            <div>
              <strong>Car Type :</strong> {carDetails.cartype}
            </div>
            <div>
              <strong>KMs Included :</strong> 84 km
            </div>
            <div>
              <strong>Total Fare :</strong> ₹ {carDetails.price}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-around">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
                Inclusions
              </button>
              <button className="bg-white text-blue-500 py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50">
                Exclusions
              </button>
              <button className="bg-white text-blue-500 py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50">
                T&C
              </button>
            </div>
            <div className="mt-4 text-sm">
              <ul className="list-disc list-inside text-gray-600">
                <li>Base Fare and Fuel Charges</li>
                <li>Driver Allowance</li>
                <li>State Tax & Toll</li>
                <li>GST (5%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;

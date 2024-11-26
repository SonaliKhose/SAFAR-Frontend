"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CarContext } from "../context/carcontext";
import { TripContext } from "../context/tripcontext";
import Breadcrumb from "../components/breadcrumbs";

function CarsPage({ id }) {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const { carDetails, setCarDetails } = useContext(CarContext);
  const { tripdata, tripType, setTripType } = useContext(TripContext);

  useEffect(() => {
    if (id) {
      fetchCars(id);
    }
  }, []);

  const breadcrumbLinks = [
    { href: "/", label: "Home" },
    { href: "/travels", label: "Select Travels" },
    { href: `/travels/${id}`, label: "Select Cars" },
  ];
  const fetchCars = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/viewcars/${id}`);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  if (!id) {
    return (
      <p className="text-center text-lg font-semibold mt-10">Loading...</p>
    );
  }
  const handleBookNow = (carId, cartype, price) => {
    setCarDetails({ cartype: cartype, price: price });
    router.push(`/booking?carId=${carId}&travelAgencyId=${id}`);
  };

  const handleModifyClick = () => {
    setTripType(tripType);
    router.push(`/?activeTrip=${tripType}`);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <Breadcrumb links={breadcrumbLinks} />
        <div className="flex flex-wrap  justify-evenly  bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          {tripType === "oneway" && (
            <>
              <div className="mb-4 mt-4">
                <strong>From:</strong> {tripdata.from} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>To:</strong> {tripdata.to} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Time:</strong> {tripdata.pickuptime} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Date:</strong> {tripdata.pickupdate} <br />
              </div>
            </>
          )}
          {tripType === "airport" && (
            <>
              <div className="mb-4 mt-4">
                <strong>From:</strong> {tripdata.from} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>To:</strong> {tripdata.to} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Time:</strong> {tripdata.pickuptime} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Date:</strong> {tripdata.pickupdate} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Trip:</strong> {tripdata.trip}
              </div>
            </>
          )}
          {tripType === "local" && (
            <>
              <div className="mb-4 mt-4">
                <strong>Pickup Time:</strong> {tripdata.pickuptime} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Date:</strong> {tripdata.pickupdate} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>City:</strong> {tripdata.city} <br />
              </div>
            </>
          )}
          {tripType === "roundtrip" && (
            <>
              <div className="mb-4 mt-4">
                <strong>From:</strong> {tripdata.from} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>To:</strong> {tripdata.to} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Date:</strong> {tripdata.pickupdate} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Return Date:</strong> {tripdata.returndate} <br />
              </div>
              <div className="mb-4 mt-4">
                <strong>Pickup Time:</strong> {tripdata.pickuptime} <br />
              </div>
            </>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={handleModifyClick}
          >
            Modify
          </button>
        </div>
        {/* Banner Section */}
        <div className="bg-blue-100 p-6 rounded-lg text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            YOU HAVE UNLOCKED A SPECIAL DISCOUNT!
          </h2>
          <div className="bg-blue-600 h-1 w-16 mx-auto my-4"></div>
          <p className="text-lg font-medium text-blue-500">
            Book NOW for Lowest All-Inclusive Fares!
          </p>
        </div>

        {/* Car Selection Section */}
        <div className="space-y-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={car.image}
                alt={`${car.cartype} logo`}
                className="w-60 h-40 object-cover"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3
                    id="cartype"
                    className="text-2xl font-semibold text-gray-800"
                  >
                    {car.cartype}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">or equivalent</p>
                  <p id="price" className="text-green-600 font-bold text-xl">
                    ₹{car.price}
                  </p>
                  <p className="text-sm text-gray-500">up to 145 km</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-400">
                    Includes Toll, State Tax & GST
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
                    onClick={() =>
                      handleBookNow(car._id, car.cartype, car.price)
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CarsPage;

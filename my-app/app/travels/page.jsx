"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TravelIdContext } from "../context/travelsIdcontext";
import { TripContext } from "../context/tripcontext";
import Breadcrumb from "../components/breadcrumbs";

function TravelPage() {
  const { tripdata, tripType, setTripType } = useContext(TripContext);
  const router = useRouter();
  const [TravelsData, setTravelsData] = useState([]);
  const { setTravelId } = useContext(TravelIdContext);

  const breadcrumbLinks = [
    { href: "/", label: "Home" },
    { href: "/travels", label: "Select Travels" },
  ];

  useEffect(() => {
    console.log("Current tripType:", tripType); // Log tripType
    console.log("Current tripdata:", tripdata); // Log tripdata
  }, [tripType, tripdata]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/view-travels", {
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        setTravelsData(response.data);
      } else {
        console.log("Error in getting travels data");
      }
    } catch (error) {
      console.error("Error fetching travels data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleViewCars = (travelId) => {
    setTravelId(travelId);
    router.push(`/travels/${travelId}`);
  };

  const handleModifyClick = () => {
    setTripType(tripType);
    router.push(`/?activeTrip=${tripType}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Breadcrumb links={breadcrumbLinks} />
      <h2 className="text-5xl font-extrabold mb-6 text-center text-blue-700">
        Available Travels
      </h2>

      <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>

      <div className="flex flex-wrap justify-evenly bg-gray-200 p-4 rounded-lg shadow-md mb-8">
        {tripType === "oneway" && (
          <>
            <div className="mb-4 mt-4">
              <strong>From:</strong> {tripdata.from} <br />
            </div>
            <div className="mb-4 mt-4" mt-4>
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

      <div className="text-center my-8 p-6 bg-blue-100 bg-opacity-80 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-wide mb-2">
          COURTEOUS. AFFORDABLE. RELIABLE.
        </h1>
        <h3 className="text-xl font-medium text-gray-700">
          That's our Promise!
        </h3>
        <div className="border-t-4 border-blue-500 w-24 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {TravelsData.length > 0 ? (
          TravelsData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>City:</strong> {item.city}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>State:</strong> {item.state}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> {item.address}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Contact No:</strong> {item.contactNo}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Email:</strong> {item.email}
              </p>
              <button
                onClick={() => handleViewCars(item._id)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Cars
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No travels available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default TravelPage;

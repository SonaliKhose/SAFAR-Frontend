import React, { useContext, useState } from "react";
import { TripContext } from "../context/tripcontext";
import axios from "axios"; // For making API calls
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Localtrip = () => {
  const { tripdata,tripType, setTripData,setTripType } = useContext(TripContext);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router for navigation

  // Fetch cities from the server
  const fetchCities = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/cities?search=${searchQuery}`);
      setCityOptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Trigger fetch for cities when the user types
    if (id === "city") {
      if (value.length >= 2) {
        fetchCities(value); // Fetch cities when input length is 2 or more
      } else {
        setCityOptions([]); // Clear options if input is less than 2 characters
      }
    }
  };

  const handleOptionSelect = (e) => {
    const { id, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setCityOptions([]); // Clear options after selection
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setTripType("local")
    console.log(tripdata); // For debugging: this will log the trip data to the console
    router.push("/travels"); // Redirect to the travels page
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">
              CITY
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="city"
              type="text"
              value={tripdata.city || ""} // Ensure value is controlled
              onChange={handleInputChange}
              required
              list="city-options"
            />
            <datalist id="city-options">
              {loading ? (
                <option>Loading...</option>
              ) : (
                cityOptions.map((city) => (
                  <option key={city._id} value={city.name} />
                ))
              )}
            </datalist>
          </div>

          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickupdate">
              PICK UP DATE
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="pickupdate"
              type="date"
              value={tripdata.pickupdate || ""} // Ensure value is controlled
              onChange={handleInputChange}
            />
          </div>

          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickuptime">
              PICK UP TIME
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="pickuptime"
              type="time"
              value={tripdata.pickuptime || ""} // Ensure value is controlled
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Explore Travels
          </button>
        </div>
      </form>
    </div>
  );
};

export default Localtrip;

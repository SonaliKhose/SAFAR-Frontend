import React, { useContext, useState } from "react";
import { TripContext } from "../context/tripcontext";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Roundtrip = () => {
  const { tripdata,tripType ,setTripData,setTripType } = useContext(TripContext);
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
    if (id === "from" || id === "to") {
      if (value.length >= 2) {
        fetchCities(value); // Fetch cities when input length is 2 or more
      } else {
        setCityOptions([]); // Clear options if input is less than 2 characters
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTripType('roundtrip');
    console.log(tripdata); // This will log the trip data for debugging

    // Navigate to the travels page
    router.push("/travels"); // Redirect to travels page with tripdata context
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="from">
              FROM
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="from"
              type="text"
              value={tripdata.from}
              onChange={handleInputChange}
              required
              list="from-options"
            />
            <datalist id="from-options">
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
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="to">
              TO
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="to"
              type="text"
              value={tripdata.to}
              onChange={handleInputChange}
              required
              list="to-options"
            />
            <datalist id="to-options">
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
              value={tripdata.pickupdate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="returndate">
              RETURN DATE
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="returndate"
              type="date"
              value={tripdata.returndate}
              onChange={handleInputChange}
              required
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
              value={tripdata.pickuptime}
              onChange={handleInputChange}
              required
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

export default Roundtrip;

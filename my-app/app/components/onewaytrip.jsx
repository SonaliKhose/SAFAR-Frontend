import React, { useContext, useState, useEffect } from "react";
import { TripContext } from "../context/tripcontext";
import { useRouter } from "next/navigation";
import axios from "axios"; // For making API calls

const OnewayTrip = () => {
  const { tripdata, setTripData } = useContext(TripContext);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleOptionSelect = (e) => {
    const { id, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setCityOptions([]); // Clear options after selection
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tripdata);
    router.push("/travels");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div className="w-[23%]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="from">
              FROM
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="from"
              type="text"
              value={tripdata.from}
              onChange={handleInputChange}
              required
              list="from-options" // For datalist to show suggestions
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

          <div className="w-[23%]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="to">
              TO
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
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

          <div className="w-[23%]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickupdate">
              PICK UP DATE
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="pickupdate"
              type="date"
              value={tripdata.pickupdate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="w-[23%]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickuptime">
              PICK UP TIME
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              id="pickuptime"
              type="time"
              value={tripdata.pickuptime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
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

export default OnewayTrip;

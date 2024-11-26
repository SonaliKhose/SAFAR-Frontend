import React, { useContext, useState } from "react";
import axios from "axios"; // For making API calls
import { TripContext } from "../context/tripcontext"; // Importing the context
import { useRouter } from "next/navigation";


const Airport = () => {
  const { tripdata,tripType, setTripData, setTripType} = useContext(TripContext); // Use context
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  

  // Fetch cities from the server
  const fetchCities = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/cities?search=${searchQuery}`);
      const citiesWithAirport = response.data.map((city) => ({
        ...city,
        name: `${city.name} Airport`, // Append 'Airport' to each city name
      }));
      setCityOptions(citiesWithAirport);
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

    // Trigger fetch for cities when the user types in the airport field
    if (id === "from" || id === "to") {
      if (value.length >= 2) {
        fetchCities(value); // Fetch cities when input length is 2 or more
      } else {
        setCityOptions([]); // Clear options if input is less than 2 characters
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTripType("airport")
    console.log(tripdata); 
      router.push("/travels")
    // Log the context data to the console
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div className="w-[23%]">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="trip">
            TRIP
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            id="trip"
            value={tripdata.trip}
            onChange={(e) => setTripData({ ...tripdata, trip: e.target.value })}
          >
            <option value="Pickup from Airport">Pickup from Airport</option>
            <option value="Drop to Airport">Drop to Airport</option>
          </select>
        </div>

        {tripdata.trip === "Pickup from Airport" ? (
          <>
            {/* Pickup from Airport */}
            <div className="w-[23%]">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="from">
                PICKUP AIRPORT
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="from"
                type="text"
                value={tripdata.from}
                onChange={handleInputChange}
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
            <div className="w-[23%]">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="to">
                DROP ADDRESS
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="to"
                type="text"
                value={tripdata.to}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            {/* Drop to Airport */}
            <div className="w-[23%]">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="from">
                PICKUP ADDRESS
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="from"
                type="text"
                value={tripdata.from}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-[23%]">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="to">
                DROP AIRPORT
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="to"
                type="text"
                value={tripdata.to}
                onChange={handleInputChange}
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
          </>
        )}

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
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          type="submit"
          onClick={handleSubmit}
        >
          Explore Travels
        </button>
      </div>
    </div>
  );
};

export default Airport;

"use client";
import React, { useState, useEffect } from "react";
import OnewayTrip from "../components/onewaytrip";
import Roundtrip from "../components/roundtrip";
import Localtrip from "../components/localtrip";
import Airport from "../components/airport";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie"; 

const Landing = () => {
  const searchParams = useSearchParams();

  const tripTypeData = searchParams.get("activeTrip");
  // const token = searchParams.get("token");
  const [token, setToken] = useState(null);
  // console.log("Token with google", token);
  // const [Socialtoken, setSocialToken] = useState(null);

  const [activeTrip, setActiveTrip] = useState("oneway");
 

  // useEffect(() => {
  //   if (token) {
  //     console.log("Setting token in cookie:", token);
  //     // Set the token in cookies, expires in 1 day
  //     Cookies.set("auth_token", token, { expires: 1, secure: true });
  //   }
  // }, [token]);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("auth_token");
    // const accessToken = Cookies.get("next-auth.session-token");
    // console.log(accessToken)

    // if (accessToken) {
    //   setSocialToken(accessToken);
    // }
    
    if (tokenFromCookie) {
      console.log("Token from cookie:", tokenFromCookie);
      setToken(tokenFromCookie);
    }
  }, []);

  useEffect(() => {
    if (tripTypeData) {
      console.log("Setting activeTrip from URL parameter:", tripTypeData);
      setActiveTrip(tripTypeData);
    }
  }, [tripTypeData]);

  const handleActive = (tripType) => {
    setActiveTrip(tripType);
  };

 // console.log("Active trip type:", activeTrip);

  return (
    <div>
      {/* Top Part */}
      <div>
        <div className="relative">
          <img
            className="w-full border-red-500 object-fill"
            src="https://www.savaari.com/assets/img/homepage/june-banners_desktop_without-text.webp"
            alt="Travel Banner"
          />
          <h4 className="absolute text-[50px] w-full text-center font-extrabold top-1/4 transform -translate-y-1/2 text-white">
            Travel with SAFAR
          </h4>
        </div>

        {/* Explore/Search box */}
        <div className="relative -mt-20 z-10 bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto">
          <div className="flex justify-around items-center mb-4 border-b border-slate-500 pb-4">
            <div
              className={`flex-1 text-center border border-gray-300 cursor-pointer rounded-md p-2 max-w-[180px] ${
                activeTrip === "oneway" ? "active" : ""
              }`}
              onClick={() => handleActive("oneway")}
            >
              <div
                className={`font-semibold text-sm ${
                  activeTrip === "oneway" ? "text-white" : "text-gray-700"
                }`}
              >
                ONE WAY
              </div>
            </div>
            <div
              className={`flex-1 text-center border border-gray-300 cursor-pointer rounded-md p-2 max-w-[180px] ${
                activeTrip === "roundtrip" ? "active" : ""
              }`}
              onClick={() => handleActive("roundtrip")}
            >
              <div
                className={`font-semibold text-sm ${
                  activeTrip === "roundtrip" ? "text-white" : "text-gray-700"
                }`}
              >
                ROUND TRIP
              </div>
            </div>
            <div
              className={`flex-1 text-center border border-gray-300 cursor-pointer rounded-md p-2 max-w-[180px] ${
                activeTrip === "local" ? "active" : ""
              }`}
              onClick={() => handleActive("local")}
            >
              <div
                className={`font-semibold text-sm ${
                  activeTrip === "local" ? "text-white" : "text-gray-700"
                }`}
              >
                LOCAL
              </div>
            </div>
            <div
              className={`flex-1 text-center border border-gray-300 cursor-pointer rounded-md p-2 max-w-[180px] ${
                activeTrip === "airport" ? "active" : ""
              }`}
              onClick={() => handleActive("airport")}
            >
              <div
                className={`font-semibold text-sm ${
                  activeTrip === "airport" ? "text-white" : "text-gray-700"
                }`}
              >
                AIRPORT
              </div>
            </div>
          </div>

          {/* Conditionally render the selected component */}
          {activeTrip === "oneway" && <OnewayTrip />}
          {activeTrip === "roundtrip" && <Roundtrip />}
          {activeTrip === "local" && <Localtrip />}
          {activeTrip === "airport" && <Airport />}
        </div>
      </div>

      {/* Middle Part */}

      <div className="bg-blue-50 py-12">
        {/* Reviws */}
        <div className="container mx-auto flex justify-around bg-blue-500 border-slate-400 w-10/12 max-w-5xl rounded-2xl cursor-pointer">
          <div className="text-center flex flex-col items-center justify-center space-y-2">
            <div className="bg-white p-2 rounded-full mt-3">
              <img
                src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tripadvisor_logo_icon_169414.png"
                alt="TripAdvisor"
                className="w-12 h-12 mx-auto"
              />
            </div>
            <div>
              <div className="text-white font-semibold">TripAdvisor</div>
              <div className="text-yellow-500 pb-2">★★★★★</div>
            </div>
          </div>
          <div className="text-center flex flex-col items-center justify-center space-y-2">
            <div className="bg-white p-2 rounded-full mt-3">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google"
                className="w-12 h-12 mx-auto"
              />
            </div>
            <div>
              <div className="text-white font-semibold">Google</div>
              <div className="text-yellow-500 pb-2">★★★★</div>
            </div>
          </div>
          <div className="text-center flex flex-col items-center justify-center space-y-2">
            <div className="bg-white p-2 rounded-full mt-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/017/395/379/original/google-play-store-mobile-apps-logo-free-png.png"
                alt="Play Store"
                className="w-12 h-12 mx-auto "
              />
            </div>
            <div>
              <div className="text-white font-semibold">Play Store</div>
              <div className="text-yellow-500 pb-2">★★★★★</div>
            </div>
          </div>
        </div>

        {/* 3-Unique qualitities of safar */}
        <div className="flex justify-between mt-12 gap-x-3 w-full max-w-6xl mx-auto">
          <div className="w-[31%] bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://www.shutterstock.com/image-photo/happy-family-look-out-car-260nw-428801083.jpg"
              alt="Happy travelling"
              className="w-full h-40 object-cover cursor-pointer"
            />
            <div className="p-4">
              <div className="font-semibold text-lg text-blue-500">
                Visible views
              </div>
              <div className="text-gray-700">Happy faces of travellers</div>
            </div>
          </div>

          <div className="w-[31%] bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://loconav.com/wp-content/uploads/2021/05/2-2.jpg"
              alt="Our Driver Partners"
              className="w-full h-40 object-cover cursor-pointer"
            />
            <div className="p-4">
              <div className="font-semibold text-lg text-blue-500">
                Our Driver Partners
              </div>
              <div className="text-gray-700">
                Punctual. Courteous. Knowledgeable.
              </div>
            </div>
          </div>

          <div className="w-[31%] bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://ik.imagekit.io/wx5dqb8qkk/blogs/blog-1692671774425.jpg?tr=h-500"
              alt="Tempo Travellers"
              className="w-full h-40 object-cover cursor-pointer"
            />
            <div className="p-4">
              <div className="font-semibold text-lg text-blue-500">
                Management
              </div>
              <div className="text-gray-700">Behind-the-Scenes Insights</div>
            </div>
          </div>
        </div>

        {/* Why SAFAR is unique? */}
        <div>
          <p className="text-center font-bold text-[32px] text-blue-600 mt-10">
            {" "}
            WHAT SETS SAFAR APART?{" "}
          </p>

          <div className="container mx-auto flex justify-between bg-blue-500 border-slate-400 w-10/12 max-w-5xl rounded-2xl mt-5">
            <div className="text-center flex flex-col items-center justify-center ml-4 mb-3">
              <div className="bg-white p-0.5 rounded-full mt-3">
                <img
                  src="https://png.pngtree.com/png-clipart/20210606/original/pngtree-sport-car-logo-vector-png-image_6398339.jpg"
                  alt="clean cars"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="text-white font-semibold pb-1">
                Clean And Hygienic Cars
              </div>
            </div>

            <div className="text-center flex flex-col items-center justify-center ml-4 mb-3">
              <div className="bg-white p-0.5 rounded-full mt-3">
                <img
                  src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-receipt-icon-png-image_927096.jpg"
                  alt="transparent billing"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="text-white font-semibold pb-1">
                Transparent Billing
              </div>
            </div>

            <div className="text-center flex flex-col items-center justify-center ml-4 mb-3">
              <div className="bg-white p-0.5 rounded-full mt-3">
                <img
                  src="https://www.shutterstock.com/image-vector/car-driver-logo-design-vector-260nw-2357980155.jpg"
                  alt="expert drivers"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="text-white font-semibold pb-1">
                Expert Chauffeurs
              </div>
            </div>

            <div className="text-center flex flex-col items-center justify-center ml-4 mb-3">
              <div className="bg-white p-0.5 rounded-full mt-3">
                <img
                  src="https://c8.alamy.com/comp/DN0TEP/vector-image-of-earth-and-famous-places-DN0TEP.jpg"
                  alt="famous cities"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="text-white font-semibold pb-1">Famous Cities</div>
            </div>

            <div className="text-center flex flex-col items-center justify-center mr-4 mb-3">
              <div className="bg-white p-0.5 rounded-full mt-3">
                <img
                  src="https://cdn.dribbble.com/userupload/6943314/file/original-786dd6189a45f15b093d10ad020c9d35.jpg"
                  alt="Quick services"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="text-white font-semibold pb-1">
                Quick Services
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-center font-bold text-[32px] text-blue-600 mt-10">
            {" "}
            OUR SERVICES{" "}
          </p>

          <div className="container mx-auto px-6 my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 ">
                <img
                  src="https://www.savaari.com/assets/img/homepage/roundtrip_services/banners-roundtrip-desktop.webp"
                  alt="ROUNDTRIP CARS"
                  className="w-full h-40 object-cover cursor-pointer"
                />
                <h1 className="text-xl font-semibold text-blue-700 mt-4 text-center">
                  ROUNDTRIP CARS
                </h1>
                <p className="text-gray-700 mt-2">
                  Our premium roundtrip services will pamper you with an
                  absolutely comfortable drive from your doorstep & back. Our
                  chauffeurs are not only courteous but are also expert travel
                  companions that will make your road travel memorable.
                  Affordable Luxury, as we’d like to call it.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img
                  src="https://www.savaari.com/assets/img/homepage/oneway_services/banners-one-ways-desktop.webp"
                  alt="ONEWAY DROPS"
                  className="w-full h-40 object-cover cursor-pointer"
                />
                <h1 className="text-xl font-semibold text-blue-700 mt-4 text-center">
                  ONEWAY DROPS
                </h1>
                <p className="text-gray-700 mt-2">
                  Our network of over 15 lakh one way routes ensures that there
                  is no corner of the country that you can’t travel with us. Pay
                  only one side charge at rock bottom rates. If you need to be
                  somewhere, we’ll get you there.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img
                  src="https://www.savaari.com/assets/img/homepage/local_services/banners-local-desktop.webp"
                  alt="LOCAL RENTALS"
                  className="w-full h-40 object-cover cursor-pointer"
                />
                <h1 className="text-xl font-semibold text-blue-700 mt-4 text-center">
                  LOCAL RENTALS
                </h1>
                <p className="text-gray-700 mt-2">
                  Book our flexible hourly rental cabs and get chauffeured
                  within the city for your business meetings or shopping chores.
                  Our local rentals are available for 4 hours, 8 hours, or 12
                  hours, based on your needs. Explore your city like a local.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img
                  src="https://www.savaari.com/assets/img/homepage/airport_services/banners-airport-desktop.webp"
                  alt="AIRPORT TRANSFERS"
                  className="w-full h-40 object-cover cursor-pointer"
                />
                <h1 className="text-xl font-semibold text-blue-700 mt-4 text-center">
                  AIRPORT TRANSFERS
                </h1>
                <p className="text-gray-700 mt-2">
                  We care about your flight as much as you do. Our airport
                  transfer services across airports in the country offer pickups
                  and drops with complete reliability. Book in advance and rest
                  easy - we will take care of the rest.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-6xl mx-auto my-8">
          <p className="text-2xl font-bold text-blue-600 mb-4">
            No matter where you travel - We've got a Car for you.!
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Planning a weekend getaway? Our outstation cab services will help
            you explore the best destinations, visit all the must-see places,
            and taste the best local food. Did you just land at an airport or
            railway station closest to your destination? No problem! You can use
            our airport taxi, the transit pick-up service to cover the last
            mile. We'll get you to your destination and show you some of the
            best sights along the way. Planning on traveling home for a family
            get-together? Try our newly introduced one-way cab services - no
            matter where you live, get dropped to your hometown by paying only
            one-side fare. Decided to take a personal day and spend the whole
            day exploring your city? Our local taxi packages will help you
            explore the best places to eat and drink at, some of the city's
            majestic monuments, greenest parks, and oldest temples. You'll never
            have to worry about an empty travel itinerary again. Are you an
            offbeat traveler? Do you just hit the road and decide to take it
            from there? We offer one-way drops on several routes, in case you
            only want to be dropped at a destination and don't want to look
            back.
          </p>
          <div className="bg-blue-500 text-white text-center p-4 rounded-lg">
            <p className="font-semibold text-xl">
              Trust Us When We Say: Let's Begin With SAFAR!!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

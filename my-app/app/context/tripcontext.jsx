const { createContext, useState } = require("react");

export const TripContext = createContext({
    tripType:"",
    setTripType: () => {},
    tripdata:{},
    setTripData:()=>{},
});

const TripProvider = ({ children }) => {
  const [tripType, setTripType] = useState("oneway");

  const [tripdata, setTripData] = useState({
    from: "",
    to: "",
    pickuptime: "",
    pickupdate: "",
    city: "",
    returndate: "",
    trip:"Pickup from Airport",
  });
 
  return (<TripContext.Provider value={{tripType,tripdata,setTripType,setTripData}}>{children}</TripContext.Provider>)

};

export default TripProvider;

 // const  [tripType, setTripType] = useState("onewaytrip");
  // const [pickupDate, setPickupDate] = useState("");
  // const [returnDate, setReturnDate] = useState("");
  // const [pickupTime, setPickupTime] = useState("");
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
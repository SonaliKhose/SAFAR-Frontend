import React, { createContext, useState } from "react";

export const TravelIdContext = createContext({
  travelId: "",
  setTravelId: () => {},
});

const TravelIdProvider = ({ children }) => {
  const [travelId, setTravelId] = useState("");
  return (
    <TravelIdContext.Provider value={{ travelId, setTravelId }}>
      {children}
    </TravelIdContext.Provider>
  );
};
export default TravelIdProvider;
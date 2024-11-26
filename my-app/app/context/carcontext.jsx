const { createContext, useState } = require("react");

export const CarContext = createContext({
    carDetails:{},
    setCarDetails:()=>{},
  
});

const CarProvider = ({ children }) => {
  const [carDetails, setCarDetails] = useState({
    cartype: "",
    price: "",
  });
  return (<CarContext.Provider value={{carDetails,setCarDetails}}>{children}</CarContext.Provider>)

};

export default CarProvider;

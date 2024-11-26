import CarsPage from "@/app/cars/page";
import React from "react";

const Cars = ({ params }) => {
  // console.log(params);
  return (
    <div>
      <CarsPage id={params.travelId} />
    </div>
  );
};

export default Cars;
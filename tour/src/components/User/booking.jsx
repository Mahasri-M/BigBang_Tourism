import React from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const packageDetails = location.state?.packageDetails || null;

  if (!packageDetails) {
    return <p>No package details found.</p>;
  }

  return (
    <div>
      <h2>Booking Page</h2>
      <div>
        <img
          src={`data:image/jpeg;base64,${packageDetails.packImage}`}
          alt="Package"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
        <h3>{packageDetails.packageName}</h3>
        <p>Destination: {packageDetails.destination}</p>
        <p>Duration: {packageDetails.duration} days</p>
        <p>Price for Adult: {packageDetails.priceForAdult}</p>
        <p>Price for Child: {packageDetails.priceForChild}</p>
        <p>Description: {packageDetails.description}</p>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default Booking;

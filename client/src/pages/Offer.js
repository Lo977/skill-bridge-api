import { useParams } from "react-router-dom";
import React from "react";
import OfferCard from "../components/OfferCard";

function Offer({ user }) {
  const { id } = useParams();
  console.log(user);
  return (
    <div>
      Offer
      <OfferCard user={user} />
    </div>
  );
}

export default Offer;

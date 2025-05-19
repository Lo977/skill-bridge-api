import React from "react";
import { useParams } from "react-router-dom";

function Offer({ user }) {
  const { id } = useParams();
  console.log(user);
  return <div>Offer</div>;
}

export default Offer;

import { useParams } from "react-router-dom";
import React from "react";
import OfferCard from "../components/OfferCard";

function Offer({ user, setUser }) {
  const { id } = useParams();
  function handleDelete(id) {
    fetch(`/offers/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const updatedSkills = user.skills
          .map((skill) => ({
            ...skill,
            offers: skill.offers.filter((offer) => offer.id !== id),
          }))
          .filter((skill) => skill.offers.length > 0);
        setUser({ ...user, skills: updatedSkills });
        console.log(updatedSkills);
      }
    });
  }
  console.log(user);
  return (
    <div>
      Offers
      <OfferCard user={user} onDelete={handleDelete} />
    </div>
  );
}

export default Offer;

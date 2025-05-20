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
  function handleEdit(updatedOffer) {
    const updatedSkills = user.skills.map((skill) =>
      skill.id === updatedOffer.skill_id
        ? {
            ...skill,
            offers: skill.offers.map((offer) =>
              offer.id === updatedOffer.id ? updatedOffer : offer
            ),
          }
        : skill
    );

    setUser({ ...user, skills: updatedSkills });
    // setEditingOfferId(null);
  }

  return (
    <div>
      Offers
      <OfferCard user={user} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default Offer;

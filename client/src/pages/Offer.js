import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferSkillForm from "../components/OfferSkillForm";
import EditOfferForm from "../components/EditOfferForm";

function Offer({ user }) {
  const [offers, setOffers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/skills")
      .then((r) => r.json())
      .then(setSkills);

    fetch("/offers")
      .then((r) => r.json())
      .then((data) => {
        const userOffers = data.filter((offer) => offer.user.id === user.id);
        setOffers(userOffers);
      });
  }, [user.id]);

  function handleAddOffer(newOffer) {
    setOffers((prevOffers) => [...prevOffers, newOffer]);
    setShowForm(false);
  }

  function handleDelete(id) {
    fetch(`/offers/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setOffers((prevOffers) =>
          prevOffers.filter((offer) => offer.id !== id)
        );
      }
    });
  }

  function handleEdit(updatedOffer) {
    const updatedOffers = offers.map((offer) =>
      offer.id === updatedOffer.id ? updatedOffer : offer
    );
    setOffers(updatedOffers);
    navigate("/offers");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Skill Offers</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: "1rem" }}
      >
        {showForm ? "Cancel" : "Offer Skill"}
      </button>

      {showForm && (
        <OfferSkillForm
          user={user}
          skills={skills}
          onAddOffer={handleAddOffer}
        />
      )}

      {Object.entries(
        offers.reduce((groups, offer) => {
          const skillName = offer.skill?.name || "Uncategorized";
          if (!groups[skillName]) groups[skillName] = [];
          groups[skillName].push(offer);
          return groups;
        }, {})
      ).map(([skillName, skillOffers]) => (
        <div key={skillName} style={{ marginBottom: "1.5rem" }}>
          <h4>{skillName}</h4>
          <ul>
            {skillOffers.map((offer) => (
              <li key={offer.id} style={{ marginBottom: "1rem" }}>
                {parseInt(id) === offer.id ? (
                  <EditOfferForm
                    offer={offer}
                    onCancel={() => navigate("/offers")}
                    onUpdate={handleEdit}
                  />
                ) : (
                  <>
                    <strong>{offer.title}</strong> – {offer.description}
                    <br />
                    <button
                      onClick={() => handleDelete(offer.id)}
                      style={{ marginRight: "0.5rem", color: "red" }}
                    >
                      Delete
                    </button>
                    <button onClick={() => navigate(`/offers/${offer.id}`)}>
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Offer;

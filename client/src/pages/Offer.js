import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OfferSkillForm from "../components/OfferSkillForm";
import OfferCard from "../components/OfferCard";
import AddCategoryForm from "../components/AddCategoryForm";
import "../styles/Offer.css";

function Offer({ user }) {
  const [offers, setOffers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [editingOfferId, setEditingOfferId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Sync editing ID with route param
  useEffect(() => {
    if (id) {
      setEditingOfferId(parseInt(id));
    }
  }, [id]);

  // Load skills and offers
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
    setEditingOfferId(null);
    navigate("/offers");
  }

  const offersBySkill = offers.reduce((acc, offer) => {
    const skill = offer.skill?.name || "Uncategorized";
    if (!acc[skill]) acc[skill] = [];
    acc[skill].push(offer);
    return acc;
  }, {});

  return (
    <div className="offer-container">
      <AddCategoryForm setSkills={setSkills} skills={skills} />

      {showForm && (
        <OfferSkillForm
          user={user}
          skills={skills}
          onAddOffer={handleAddOffer}
        />
      )}

      <div className="offer-header">
        <h2>Your Offers</h2>
        <button
          className="offer-form-toggle"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Offer Skill"}
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="category-message">
          You have no skill offers yet. Start by adding one!
        </p>
      ) : (
        Object.entries(offersBySkill).map(([skillName, skillOffers]) => (
          <div className="offer-section" key={skillName}>
            <OfferCard
              onAddOffer={handleAddOffer}
              skillName={skillName}
              offers={skillOffers}
              user={user}
              skills={skills}
              isActive={activeSkill === skillName}
              onClick={() =>
                setActiveSkill(activeSkill === skillName ? null : skillName)
              }
              editId={editingOfferId}
              setEditingOfferId={setEditingOfferId}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Offer;

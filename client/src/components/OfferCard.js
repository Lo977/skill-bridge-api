import React, { useState } from "react";
import EditOfferForm from "./EditOfferForm";
import OfferSkillForm from "./OfferSkillForm";
import "../styles/OfferCard.css";
import { useNavigate } from "react-router-dom";

function OfferCard({
  skills,
  editId,
  onDelete,
  onEdit,
  setEditingOfferId,
  user,
  onAddOffer,
}) {
  const [expandedSkillId, setExpandedSkillId] = useState(null);
  const [showFormForCategory, setShowFormForCategory] = useState(null);
  const navigate = useNavigate();

  const effectiveExpandedId =
    expandedSkillId ?? (skills.length === 1 ? skills[0].id : null);

  const renderedOffers = skills.map((skill) => {
    const isExpanded = effectiveExpandedId === skill.id;

    return (
      <div key={skill.id} className="offer-category">
        <h3 onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}>
          {skill.name}
        </h3>

        {isExpanded && (
          <>
            <ul className="offer-list">
              {skill.offers.map((offer) => (
                <li key={offer.id}>
                  {editId === offer.id ? (
                    <EditOfferForm
                      offer={offer}
                      onUpdate={onEdit}
                      onCancel={() => {
                        setEditingOfferId(null);
                        navigate(`/my-skills/${skill.id}/offers`);
                      }}
                    />
                  ) : (
                    <>
                      <strong>{offer.title}</strong> – {offer.description}
                      <div className="offer-buttons">
                        <button onClick={() => onDelete(offer.id)}>🗑️</button>
                        <button
                          onClick={() =>
                            navigate(
                              `/my-skills/${skill.id}/offers/${offer.id}/edit`
                            )
                          }
                        >
                          ✏️
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {showFormForCategory === skill.name ? (
              <OfferSkillForm
                user={user}
                skills={skills}
                preselectedSkill={skill}
                onCancel={() => setShowFormForCategory(null)}
                onAddOffer={(newOffer) => {
                  onAddOffer(newOffer);
                  setShowFormForCategory(null);
                }}
              />
            ) : (
              <button
                className="add-offer-button"
                onClick={() => setShowFormForCategory(skill.name)}
              >
                ➕ Add Offer
              </button>
            )}
          </>
        )}
      </div>
    );
  });

  return <div>{renderedOffers}</div>;
}

export default OfferCard;

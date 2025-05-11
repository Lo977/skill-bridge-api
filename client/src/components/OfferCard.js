import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditOfferForm from "./EditOfferForm";
import OfferSkillForm from "./OfferSkillForm";
import "../styles/OfferCard.css";

function OfferCard({
  offers,
  skills,
  editId,
  onDelete,
  onEdit,
  setEditingOfferId,
  user,
  onAddOffer,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showFormForCategory, setShowFormForCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Offers data:", offers);
  }, [offers]);

  const offersByCategory = offers.reduce((acc, offer) => {
    const skillName = offer.skill?.name || "Uncategorized";
    if (!acc[skillName]) acc[skillName] = [];
    acc[skillName].push(offer);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(offersByCategory).map(([skillName, skillOffers]) => {
        const selectedSkill = skills.find((s) => s.name === skillName);

        return (
          <div key={skillName} className="offer-category">
            <h4
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === skillName ? null : skillName
                )
              }
            >
              🔘 {skillName}
            </h4>

            {expandedCategory === skillName && (
              <>
                <ul className="offer-list">
                  {skillOffers.map((offer) => (
                    <li key={offer.id || Math.random()}>
                      {parseInt(editId, 10) === offer.id && offer ? (
                        <EditOfferForm
                          offer={offer}
                          onCancel={() => setEditingOfferId(null)}
                          onUpdate={onEdit}
                          skills={skills}
                        />
                      ) : (
                        <>
                          <strong>{offer.title}</strong> – {offer.description}
                          <div className="offer-buttons">
                            <button onClick={() => onDelete(offer.id)}>
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setEditingOfferId(offer.id);
                                navigate(`/offers/${offer.id}`);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {showFormForCategory === skillName ? (
                  <OfferSkillForm
                    user={user}
                    skills={skills}
                    preselectedSkill={selectedSkill}
                    onAddOffer={(newOffer) => {
                      onAddOffer(newOffer);
                      setShowFormForCategory(null);
                    }}
                    onCancel={() => setShowFormForCategory(null)}
                  />
                ) : (
                  <button
                    className="add-offer-button"
                    onClick={() => setShowFormForCategory(skillName)}
                  >
                    Add Offer
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OfferCard;

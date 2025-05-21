import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOfferForm from "./EditOfferForm";
import OfferSkillForm from "./OfferSkillForm";

function OfferCard({ user, onDelete, onEdit, skills }) {
  const [expandCategory, setExpandCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormForCategory, setShowFormForCategory] = useState(null);
  console.log(showFormForCategory);
  const navigate = useNavigate();
  console.log(expandCategory);
  const renderedOffers = user.skills.map((skill) => {
    const selectedSkill = skills.find((s) => s.id === skill.id);
    return (
      <div>
        <h4
          key={skill.id}
          onClick={() =>
            setExpandCategory(expandCategory === skill.name ? null : skill.name)
          }
        >
          {skill.name}
        </h4>
        {expandCategory === skill.name && (
          <>
            <ul>
              {skill.offers.map((offer) => (
                <>
                  <strong key={offer.id}> - {offer.title}</strong>-{" "}
                  {offer.description}
                  <div>
                    <button onClick={() => onDelete(offer.id)}>Delete</button>
                    <button
                      onClick={() => {
                        setShowForm(true);
                        navigate(`/offers/${offer.id}`);
                      }}
                    >
                      Edit
                    </button>
                    {showForm && (
                      <EditOfferForm
                        offer={offer}
                        onEdit={onEdit}
                        onSetForm={setShowForm}
                      />
                    )}
                  </div>
                </>
              ))}
            </ul>

            {showFormForCategory === skill.name ? (
              <OfferSkillForm
                skills={skills}
                onCancel={setShowFormForCategory}
                preSelectSkill={selectedSkill}
              />
            ) : (
              <button onClick={() => setShowFormForCategory(skill.name)}>
                Add Offer
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
